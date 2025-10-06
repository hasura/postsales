#!/usr/bin/env python3
"""
Hasura DDN Role Management Script
Simplifies creating new roles with different combinations of fields and models.
Supports creating roles as unions of existing roles.
"""

import os
import yaml
import json
import shutil
from datetime import datetime
from typing import Dict, List, Set, Optional, Union
from pathlib import Path
import argparse

class HasuraRoleManager:
    def __init__(self, metadata_path: str = "../app/metadata"):
        self.metadata_path = Path(metadata_path)
        self.models = {}
        self.load_existing_models()
    
    def load_existing_models(self):
        """Load all existing models and their field definitions, plus existing roles"""
        print(f"Loading models from {self.metadata_path}")
        
        for hml_file in self.metadata_path.glob("*.hml"):
            # Skip connector files (they typically end with -types.hml or are connector definition files)
            if self._is_connector_file(hml_file):
                continue
                
            try:
                with open(hml_file, 'r') as f:
                    content = f.read()
                    
                # Parse YAML documents
                docs = list(yaml.safe_load_all(content))
                
                model_name = None
                fields = []
                existing_roles = {}
                
                for doc in docs:
                    if doc and doc.get('kind') == 'ObjectType':
                        model_name = doc['definition']['name']
                        fields = [field['name'] for field in doc['definition']['fields']]
                    elif doc and doc.get('kind') == 'TypePermissions':
                        # Extract existing role permissions
                        for perm in doc['definition'].get('permissions', []):
                            role_name = perm['role']
                            allowed_fields = perm.get('output', {}).get('allowedFields', [])
                            existing_roles[role_name] = allowed_fields
                
                if model_name:
                    self.models[model_name] = {
                        'fields': fields,
                        'file_path': hml_file,
                        'existing_roles': existing_roles
                    }
                    print(f"  Loaded {model_name} with {len(fields)} fields and {len(existing_roles)} existing roles")
                    
            except Exception as e:
                print(f"  Error loading {hml_file}: {e}")
    
    def _is_connector_file(self, hml_file):
        """
        Determine if an HML file is a connector file rather than a model file
        
        Connector files typically:
        1. End with '-types.hml' (e.g., myoracle-types.hml, postgres-types.hml)
        2. Are connector definition files (contain DataConnectorLink)
        3. Have connector-specific naming patterns
        """
        file_name = hml_file.name.lower()
        
        # Check for common connector file patterns
        if file_name.endswith('-types.hml'):
            return True
        
        # Check if file contains DataConnectorLink (connector definition)
        try:
            with open(hml_file, 'r') as f:
                content = f.read()
                
            # Parse YAML documents to check for DataConnectorLink
            docs = list(yaml.safe_load_all(content))
            for doc in docs:
                if doc and doc.get('kind') == 'DataConnectorLink':
                    return True
                    
        except Exception:
            # If we can't read the file, assume it's not a connector file
            pass
        
        return False
    
    def list_models(self):
        """List all available models and their fields"""
        print("\n=== Available Models ===")
        for model_name, info in self.models.items():
            print(f"\n{model_name}:")
            for field in info['fields']:
                print(f"  - {field}")
    
    def list_existing_roles(self):
        """List all existing roles across all models"""
        print("\n=== Existing Roles ===")
        all_roles = {}
        
        for model_name, info in self.models.items():
            for role_name, fields in info.get('existing_roles', {}).items():
                if role_name not in all_roles:
                    all_roles[role_name] = {}
                all_roles[role_name][model_name] = fields
        
        for role_name, models in all_roles.items():
            print(f"\n{role_name}:")
            for model_name, fields in models.items():
                print(f"  {model_name}: {fields}")
    
    def get_role_permissions(self, role_name: str) -> Dict[str, List[str]]:
        """Get permissions for an existing role across all models"""
        role_permissions = {}
        
        for model_name, info in self.models.items():
            existing_roles = info.get('existing_roles', {})
            if role_name in existing_roles:
                role_permissions[model_name] = existing_roles[role_name]
        
        return role_permissions
    
    def create_union_role(self, new_role_name: str, base_roles: List[str]) -> Dict:
        """
        Create a new role as a union of existing roles
        
        Args:
            new_role_name: Name of the new role to create
            base_roles: List of existing role names to combine
        """
        print(f"\n=== Creating Union Role: {new_role_name} ===")
        print(f"Combining roles: {', '.join(base_roles)}")
        
        union_permissions = {}
        
        # Get permissions from each base role
        for base_role in base_roles:
            print(f"\nProcessing base role: {base_role}")
            role_perms = self.get_role_permissions(base_role)
            
            if not role_perms:
                print(f"  Warning: Role '{base_role}' not found or has no permissions")
                continue
            
            # Merge permissions (union of fields for each model)
            for model_name, fields in role_perms.items():
                if model_name not in union_permissions:
                    union_permissions[model_name] = set()
                
                union_permissions[model_name].update(fields)
                print(f"  Added {len(fields)} fields from {model_name}")
        
        # Convert sets back to lists
        final_permissions = {
            model: list(fields) for model, fields in union_permissions.items()
        }
        
        # Create role configuration
        role_config = self.create_role_config(new_role_name, final_permissions)
        
        print(f"\n=== Union Role Summary ===")
        total_models = len(final_permissions)
        total_fields = sum(len(fields) for fields in final_permissions.values())
        print(f"Total models: {total_models}")
        print(f"Total fields: {total_fields}")
        
        for model_name, fields in final_permissions.items():
            print(f"  {model_name}: {len(fields)} fields")
        
        return role_config
    
    def remove_role(self, role_name: str) -> bool:
        """
        Remove a role from all HML files
        
        Args:
            role_name: Name of the role to remove
            
        Returns:
            bool: True if role was found and removed, False otherwise
        """
        # Protect admin roles
        if role_name.lower() in ['admin', 'administrator']:
            print(f"Error: Cannot remove protected role '{role_name}'")
            return False
        
        print(f"\n=== Removing Role: {role_name} ===")
        
        role_found = False
        files_updated = 0
        
        for model_name, info in self.models.items():
            existing_roles = info.get('existing_roles', {})
            
            if role_name not in existing_roles:
                continue
                
            role_found = True
            file_path = info['file_path']
            print(f"  Removing from {file_path.name}")
            
            try:
                # Read existing file
                with open(file_path, 'r') as f:
                    content = f.read()
                
                # Parse YAML documents
                docs = list(yaml.safe_load_all(content))
                
                # Remove role from TypePermissions and ModelPermissions
                for doc in docs:
                    if not doc:
                        continue
                        
                    if doc.get('kind') == 'TypePermissions':
                        # Remove role from TypePermissions
                        permissions = doc['definition']['permissions']
                        original_count = len(permissions)
                        permissions = [p for p in permissions if p['role'] != role_name]
                        
                        if len(permissions) < original_count:
                            doc['definition']['permissions'] = permissions
                            print(f"    [OK] Removed from TypePermissions")
                    
                    elif doc.get('kind') == 'ModelPermissions':
                        # Remove role from ModelPermissions
                        permissions = doc['definition']['permissions']
                        original_count = len(permissions)
                        permissions = [p for p in permissions if p['role'] != role_name]
                        
                        if len(permissions) < original_count:
                            doc['definition']['permissions'] = permissions
                            print(f"    [OK] Removed from ModelPermissions")
                
                # Write back to file
                with open(file_path, 'w') as f:
                    yaml.dump_all(docs, f, default_flow_style=False, sort_keys=False)
                
                files_updated += 1
                
            except Exception as e:
                print(f"    [ERROR] Error updating {file_path}: {e}")
        
        if role_found:
            print(f"\n[OK] Role '{role_name}' removed from {files_updated} files")
            return True
        else:
            print(f"\n[WARNING] Role '{role_name}' not found in any files")
            return False
    
    def create_role_config(self, role_name: str, model_permissions: Dict[str, List[str]],
                          model_filters: Optional[Dict[str, str]] = None) -> Dict:
        """
        Create a role configuration
        
        Args:
            role_name: Name of the new role
            model_permissions: Dict mapping model names to list of allowed fields
            model_filters: Optional dict mapping model names to filter expressions
        """
        if model_filters is None:
            model_filters = {}
            
        config = {
            'role_name': role_name,
            'permissions': []
        }
        
        for model_name, allowed_fields in model_permissions.items():
            if model_name not in self.models:
                print(f"Warning: Model {model_name} not found")
                continue
                
            # Validate fields
            available_fields = set(self.models[model_name]['fields'])
            requested_fields = set(allowed_fields)
            invalid_fields = requested_fields - available_fields
            
            if invalid_fields:
                print(f"Warning: Invalid fields for {model_name}: {invalid_fields}")
                allowed_fields = list(requested_fields & available_fields)
            
            permission = {
                'model': model_name,
                'fields': allowed_fields,
                'filter': model_filters.get(model_name, 'null')
            }
            config['permissions'].append(permission)
        
        return config
    
    def apply_role_to_files(self, role_config: Dict):
        """Apply the role configuration to all relevant HML files"""
        role_name = role_config['role_name']
        
        print(f"\n=== Applying role '{role_name}' to HML files ===")
        
        for permission in role_config['permissions']:
            model_name = permission['model']
            allowed_fields = permission['fields']
            filter_expr = permission['filter']
            
            if model_name not in self.models:
                continue
                
            file_path = self.models[model_name]['file_path']
            print(f"  Updating {file_path.name}")
            
            try:
                # Read existing file
                with open(file_path, 'r') as f:
                    content = f.read()
                
                # Parse YAML documents
                docs = list(yaml.safe_load_all(content))
                
                # Update TypePermissions and ModelPermissions
                for doc in docs:
                    if not doc:
                        continue
                        
                    if doc.get('kind') == 'TypePermissions':
                        # Add new role to TypePermissions
                        permissions = doc['definition']['permissions']
                        
                        # Remove existing role if it exists
                        permissions = [p for p in permissions if p['role'] != role_name]
                        
                        # Add new role
                        permissions.append({
                            'role': role_name,
                            'output': {
                                'allowedFields': allowed_fields
                            }
                        })
                        
                        doc['definition']['permissions'] = permissions
                    
                    elif doc.get('kind') == 'ModelPermissions':
                        # Add new role to ModelPermissions
                        permissions = doc['definition']['permissions']
                        
                        # Remove existing role if it exists
                        permissions = [p for p in permissions if p['role'] != role_name]
                        
                        # Add new role
                        new_permission = {
                            'role': role_name,
                            'select': {
                                'filter': None if filter_expr == 'null' else filter_expr,
                                'allowSubscriptions': True
                            }
                        }
                        permissions.append(new_permission)
                        
                        doc['definition']['permissions'] = permissions
                
                # Write back to file
                with open(file_path, 'w') as f:
                    yaml.dump_all(docs, f, default_flow_style=False, sort_keys=False)
                
                print(f"    [OK] Added role '{role_name}' with {len(allowed_fields)} fields")
                
            except Exception as e:
                print(f"    [ERROR] Error updating {file_path}: {e}")
    
    def create_predefined_roles(self):
        """Create some common predefined roles"""
        
        # 1. Read-only role with basic fields
        readonly_permissions = {}
        for model_name in self.models:
            # Get basic fields (typically IDs and names)
            fields = self.models[model_name]['fields']
            basic_fields = []
            
            for field in fields:
                if any(keyword in field.lower() for keyword in ['id', 'name', 'title']):
                    basic_fields.append(field)
            
            if basic_fields:
                readonly_permissions[model_name] = basic_fields
        
        readonly_config = self.create_role_config('readonly', readonly_permissions)
        
        # 2. Customer service role (customer-related data)
        customer_service_permissions = {}
        customer_models = ['ChinookCustomer', 'ChinookInvoice', 'ChinookInvoiceline']
        
        for model_name in customer_models:
            if model_name in self.models:
                fields = self.models[model_name]['fields']
                # Exclude sensitive fields like internal IDs
                safe_fields = [f for f in fields if not f.lower().endswith('repid')]
                customer_service_permissions[model_name] = safe_fields
        
        cs_config = self.create_role_config('customer_service', customer_service_permissions)
        
        # 3. Analytics role (read-only access to all models but limited fields)
        analytics_permissions = {}
        for model_name in self.models:
            fields = self.models[model_name]['fields']
            # Include IDs and quantitative fields, exclude personal info
            analytics_fields = []
            
            for field in fields:
                field_lower = field.lower()
                if (any(keyword in field_lower for keyword in ['id', 'total', 'price', 'quantity', 'date']) 
                    and not any(sensitive in field_lower for sensitive in ['email', 'phone', 'address', 'fax'])):
                    analytics_fields.append(field)
            
            if analytics_fields:
                analytics_permissions[model_name] = analytics_fields
        
        analytics_config = self.create_role_config('analytics', analytics_permissions)
        
        return [readonly_config, cs_config, analytics_config]
    
    def save_role_config(self, role_config: Dict, filename: str):
        """Save role configuration to JSON file"""
        with open(filename, 'w') as f:
            json.dump(role_config, f, indent=2)
        print(f"Role configuration saved to {filename}")
    
    def load_role_config(self, filename: str) -> Dict:
        """Load role configuration from JSON file"""
        with open(filename, 'r') as f:
            return json.load(f)

def create_metadata_backup(metadata_path: str) -> str:
    """
    Create a timestamped backup of the metadata directory in a dedicated backups folder
    
    Args:
        metadata_path: Path to the metadata directory (e.g., "../app/metadata")
        
    Returns:
        str: Path to the created backup directory
    """
    # Generate timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Smart backup directory naming
    metadata_path_obj = Path(metadata_path).resolve()
    
    # Extract parent and directory name
    # ../app/metadata -> app_metadata_backup_20241006_175147
    parent_name = metadata_path_obj.parent.name
    dir_name = metadata_path_obj.name
    backup_name = f"{parent_name}_{dir_name}_backup_{timestamp}"
    
    # Create backups directory in current working directory
    backups_dir = Path.cwd() / "backups"
    backups_dir.mkdir(exist_ok=True)
    backup_path = backups_dir / backup_name
    
    print(f"[BACKUP] Creating backup: backups/{backup_name}")
    
    try:
        # Copy entire metadata directory
        shutil.copytree(metadata_path, backup_path)
        print(f"[OK] Backup created: backups/{backup_name}")
        
        # Create rollback instructions file
        rollback_file = backups_dir / f"{backup_name}_ROLLBACK.txt"
        with open(rollback_file, 'w') as f:
            f.write(f"HASURA DDN ROLE MANAGER - ROLLBACK INSTRUCTIONS\n")
            f.write(f"=" * 50 + "\n\n")
            f.write(f"Backup created: {datetime.now()}\n")
            f.write(f"Original path: {metadata_path}\n")
            f.write(f"Backup path: backups/{backup_name}\n\n")
            f.write(f"ROLLBACK COMMANDS:\n")
            f.write(f"-" * 20 + "\n\n")
            f.write(f"Linux/macOS:\n")
            f.write(f"  rm -rf {metadata_path}\n")
            f.write(f"  mv backups/{backup_name} {metadata_path}\n\n")
            f.write(f"Windows:\n")
            f.write(f"  rmdir /S /Q {metadata_path}\n")
            f.write(f"  move backups\\{backup_name} {metadata_path}\n\n")
            f.write(f"VERIFICATION:\n")
            f.write(f"-" * 15 + "\n")
            f.write(f"After rollback, verify with:\n")
            f.write(f"  python role_manager.py --metadata-path {metadata_path} --list-roles\n")
        
        print(f"[INFO] Rollback instructions: backups/{rollback_file.name}")
        return str(backup_path)
        
    except Exception as e:
        print(f"[ERROR] Backup failed: {e}")
        return ""

def main():
    parser = argparse.ArgumentParser(description='Hasura DDN Role Management')
    parser.add_argument('--metadata-path', default='../app/metadata',
                       help='Path to metadata directory')
    parser.add_argument('--list-models', action='store_true',
                       help='List all available models and fields')
    parser.add_argument('--list-roles', action='store_true',
                       help='List all existing roles')
    parser.add_argument('--create-predefined', action='store_true',
                       help='Create predefined roles (readonly, customer_service, analytics)')
    parser.add_argument('--apply-config', type=str,
                       help='Apply role configuration from JSON file')
    parser.add_argument('--interactive', action='store_true',
                       help='Interactive role creation mode')
    parser.add_argument('--create-union', nargs='+', metavar=('NEW_ROLE', 'BASE_ROLE'),
                       help='Create role as union of existing roles: --create-union new_role_name base_role1 base_role2 ...')
    parser.add_argument('--remove-role', type=str, metavar='ROLE_NAME',
                       help='Remove a role from all HML files (cannot remove admin/Admin roles)')
    parser.add_argument('--no-backup', action='store_true',
                       help='Skip creating backup before making changes (not recommended)')
    
    args = parser.parse_args()
    
    manager = HasuraRoleManager(args.metadata_path)
    
    # Create backup by default for destructive operations (unless --no-backup is used)
    destructive_operations = (args.create_predefined or args.apply_config or
                             args.create_union or args.remove_role or args.interactive)

    if destructive_operations and not args.no_backup:
        print("[BACKUP] Creating automatic backup before making changes...")
        backup_path = create_metadata_backup(args.metadata_path)
        if not backup_path:
            print("[ERROR] Backup failed! Use --no-backup to proceed anyway (not recommended).")
            print("        Or fix the backup issue and try again.")
            return
        print()  # Add spacing after backup messages
    elif destructive_operations and args.no_backup:
        print("[WARNING] Proceeding without backup (--no-backup flag used)")
        print()
    
    if args.list_models:
        manager.list_models()
        return
    
    if args.list_roles:
        manager.list_existing_roles()
        return
    
    if args.create_union:
        if len(args.create_union) < 2:
            print("Error: --create-union requires at least a new role name and one base role")
            print("Usage: --create-union new_role_name base_role1 [base_role2 ...]")
            return
        
        new_role_name = args.create_union[0]
        base_roles = args.create_union[1:]
        
        union_config = manager.create_union_role(new_role_name, base_roles)
        
        # Save and apply the union role
        filename = f"role_config_{new_role_name}_union.json"
        manager.save_role_config(union_config, filename)
        
        confirm = input(f"\nApply union role '{new_role_name}'? (y/N): ").strip().lower()
        if confirm == 'y':
            manager.apply_role_to_files(union_config)
            print(f"[OK] Union role '{new_role_name}' created and applied successfully!")
        else:
            print(f"Union role configuration saved to {filename} but not applied.")
        return
    
    if args.remove_role:
        role_name = args.remove_role
        
        # Confirm removal
        print(f"WARNING: This will remove role '{role_name}' from ALL HML files.")
        print("This action cannot be undone!")
        
        if role_name.lower() in ['admin', 'administrator']:
            print(f"Error: Cannot remove protected role '{role_name}'")
            return
        
        confirm = input(f"\nAre you sure you want to remove role '{role_name}'? (yes/N): ").strip().lower()
        if confirm == 'yes':
            success = manager.remove_role(role_name)
            if success:
                print(f"[OK] Role '{role_name}' has been successfully removed!")
            else:
                print(f"[ERROR] Failed to remove role '{role_name}'")
        else:
            print("Role removal cancelled.")
        return
    
    if args.create_predefined:
        print("Creating predefined roles...")
        predefined_roles = manager.create_predefined_roles()
        
        for role_config in predefined_roles:
            print(f"\n=== {role_config['role_name']} Role ===")
            for perm in role_config['permissions']:
                print(f"  {perm['model']}: {len(perm['fields'])} fields")
            
            # Save config
            filename = f"role_config_{role_config['role_name']}.json"
            manager.save_role_config(role_config, filename)
            
            # Apply to files
            manager.apply_role_to_files(role_config)
        
        print("\n[OK] Predefined roles created successfully!")
        return
    
    if args.apply_config:
        print(f"Applying role configuration from {args.apply_config}")
        role_config = manager.load_role_config(args.apply_config)
        manager.apply_role_to_files(role_config)
        print("[OK] Role configuration applied successfully!")
        return
    
    if args.interactive:
        interactive_role_creation(manager)
        return
    
    # Default: show help
    parser.print_help()

def interactive_role_creation(manager: HasuraRoleManager):
    """Interactive mode for creating custom roles"""
    print("\n=== Interactive Role Creation ===")
    
    role_name = input("Enter role name: ").strip()
    if not role_name:
        print("Role name is required!")
        return
    
    print(f"\nAvailable models:")
    model_names = list(manager.models.keys())
    for i, model in enumerate(model_names, 1):
        print(f"  {i}. {model}")
    
    model_permissions = {}
    
    while True:
        model_choice = input(f"\nSelect model (1-{len(model_names)}) or 'done' to finish: ").strip()
        
        if model_choice.lower() == 'done':
            break
        
        try:
            model_idx = int(model_choice) - 1
            if 0 <= model_idx < len(model_names):
                model_name = model_names[model_idx]
                fields = manager.models[model_name]['fields']
                
                print(f"\nFields in {model_name}:")
                for i, field in enumerate(fields, 1):
                    print(f"  {i}. {field}")
                
                field_choice = input("Select fields (comma-separated numbers) or 'all': ").strip()
                
                if field_choice.lower() == 'all':
                    selected_fields = fields
                else:
                    try:
                        field_indices = [int(x.strip()) - 1 for x in field_choice.split(',')]
                        selected_fields = [fields[i] for i in field_indices if 0 <= i < len(fields)]
                    except:
                        print("Invalid field selection!")
                        continue
                
                model_permissions[model_name] = selected_fields
                print(f"[OK] Added {len(selected_fields)} fields from {model_name}")
            else:
                print("Invalid model selection!")
        except ValueError:
            print("Invalid input!")
    
    if not model_permissions:
        print("No permissions defined!")
        return
    
    # Create and apply role
    role_config = manager.create_role_config(role_name, model_permissions)
    
    print(f"\n=== Role Summary: {role_name} ===")
    for perm in role_config['permissions']:
        print(f"  {perm['model']}: {perm['fields']}")
    
    confirm = input("\nApply this role? (y/N): ").strip().lower()
    if confirm == 'y':
        filename = f"role_config_{role_name}.json"
        manager.save_role_config(role_config, filename)
        manager.apply_role_to_files(role_config)
        print(f"[OK] Role '{role_name}' created successfully!")
    else:
        print("Role creation cancelled.")

if __name__ == "__main__":
    main()