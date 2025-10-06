# Hasura DDN Role Manager

A comprehensive Python tool for managing roles and permissions in Hasura DDN metadata files with advanced features including union roles, safe role removal, and automatic backup functionality.

![Python](https://img.shields.io/badge/python-3.6+-blue.svg)
![Hasura](https://img.shields.io/badge/hasura-DDN-purple.svg)

## 🚀 Features

- ✅ **Automatic Model Discovery**: Scans all `.hml` files and extracts model definitions
- ✅ **Smart Connector Detection**: Automatically skips connector files (any connector: Oracle, PostgreSQL, Redshift, etc.)
- ✅ **Predefined Roles**: Creates common roles (`readonly`, `customer_service`, `analytics`)
- ✅ **Union Roles**: Combine permissions from multiple existing roles (unlimited base roles)
- ✅ **Role Removal**: Safely remove roles with admin protection
- ✅ **Interactive Mode**: Step-by-step role creation wizard
- ✅ **Configuration Files**: Save and reuse role definitions
- ✅ **Field Validation**: Ensures only valid fields are assigned to roles
- ✅ **Batch Processing**: Apply roles to multiple models simultaneously
- ✅ **Automatic Backups**: Creates timestamped backups before destructive operations
- ✅ **Rollback Support**: Generates rollback instructions for easy recovery

## 🔒 Safety Features

- 🔒 **Admin Protection**: Cannot remove `admin` or `Administrator` roles
- 🔒 **Confirmation Prompts**: Requires explicit confirmation for destructive operations
- 🔒 **Field Validation**: Validates field names against actual model definitions
- 🔒 **Error Handling**: Graceful handling of file access and parsing errors
- 🔒 **Automatic Backups**: Creates backups by default before making changes
- 🔒 **Rollback Instructions**: Provides platform-specific rollback commands

## 📦 Installation

### Prerequisites
- Python 3.6 or higher
- PyYAML library

### Setup
```bash
# Navigate to the role manager directory
cd supergraph_dir/hasura-role-manager

# Install dependencies
pip install -r requirements.txt
```

## 🏃‍♂️ Quick Start

### 1. Navigate to the Role Manager Directory
```bash
# Navigate to the role manager utility
cd supergraph_dir/hasura-role-manager

# Verify you have access to metadata
ls ../app/metadata/
```

### 2. List Your Models
```bash
python role_manager.py --metadata-path ../app/metadata --list-models
```

### 3. List Existing Roles
```bash
python role_manager.py --metadata-path ../app/metadata --list-roles
```

### 4. Create Predefined Roles
```bash
python role_manager.py --metadata-path ../app/metadata --create-predefined
```

### 5. Create Union Roles
```bash
python role_manager.py --metadata-path ../app/metadata --create-union manager readonly customer_service
```

## 📋 Complete Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `--metadata-path PATH --list-models` | Show all models and their fields | `python role_manager.py --metadata-path ../app/metadata --list-models` |
| `--metadata-path PATH --list-roles` | Show all existing roles | `python role_manager.py --metadata-path ../app/metadata --list-roles` |
| `--metadata-path PATH --create-predefined` | Create common roles (with backup) | `python role_manager.py --metadata-path ../app/metadata --create-predefined` |
| `--metadata-path PATH --create-union NEW BASE1 BASE2` | Create union role (with backup) | `python role_manager.py --metadata-path ../app/metadata --create-union manager readonly customer_service` |
| `--metadata-path PATH --remove-role ROLE` | Remove role (with backup & confirmation) | `python role_manager.py --metadata-path ../app/metadata --remove-role old_role` |
| `--metadata-path PATH --apply-config FILE` | Apply role from JSON config (with backup) | `python role_manager.py --metadata-path ../app/metadata --apply-config example_sales_role.json` |
| `--metadata-path PATH --interactive` | Interactive role creation (with backup) | `python role_manager.py --metadata-path ../app/metadata --interactive` |
| `--no-backup` | Skip automatic backup (add to any destructive command) | `python role_manager.py --metadata-path ../app/metadata --create-predefined --no-backup` |

## 🎯 Common Use Cases

### Customer Portal Role
```bash
python role_manager.py --metadata-path ../app/metadata --apply-config example_sales_role.json
```

### Support Team Role (Union of existing roles)
```bash
python role_manager.py --metadata-path ../app/metadata --create-union support_team readonly customer_service
```

### Remove Unused Roles
```bash
python role_manager.py --metadata-path ../app/metadata --remove-role old_test_role
```

## 🔧 Configuration Files

Create custom roles using JSON configuration:

```json
{
  "role_name": "sales_team",
  "permissions": [
    {
      "model": "ChinookCustomer",
      "fields": ["customerid", "firstname", "lastname", "email", "company"],
      "filter": "null"
    },
    {
      "model": "ChinookInvoice",
      "fields": ["invoiceid", "customerid", "invoicedate", "total"],
      "filter": "null"
    }
  ]
}
```

### Filter Examples

#### No Filter (Full Access)
```json
"filter": "null"
```

#### User-Specific Data
```json
"filter": "{\"customerid\": {\"_eq\": \"x-hasura-user-id\"}}"
```

#### Status-Based Filter
```json
"filter": "{\"status\": {\"_eq\": \"active\"}}"
```

## 🎮 Interactive Mode

The interactive mode provides a step-by-step wizard for creating roles:

```bash
python role_manager.py --metadata-path ../app/metadata --interactive
```

### Interactive Mode Example:
```
=== Interactive Role Creation ===

Enter role name: demo_role

Available models:
  1. ChinookAlbum
  2. ChinookArtist
  3. ChinookCustomer
  ... (shows all 26 models)

Select model (1-26) or 'done' to finish: 3

Fields in ChinookCustomer:
  1. address
  2. city
  3. company
  4. customerid
  5. email
  6. firstname
  7. lastname
  ... (shows all fields)

Select fields (comma-separated numbers) or 'all': 4,6,7,5

[OK] Added 4 fields from ChinookCustomer

Select model (1-26) or 'done' to finish: done

=== Role Summary: demo_role ===
  ChinookCustomer: ['customerid', 'firstname', 'lastname', 'email']

Apply this role? (y/N): y

[OK] Role 'demo_role' created successfully!
```

### Interactive Mode Features:
- ✅ **Guided Selection**: Choose models and fields step-by-step
- ✅ **Field Visibility**: See all available fields for each model
- ✅ **Flexible Selection**: Select specific fields or 'all'
- ✅ **Progress Tracking**: Shows what's been selected
- ✅ **Final Review**: Summary before applying

## 🔄 Union Roles

Union roles combine permissions from multiple existing roles:

### Basic Union (2 roles)
```bash
python role_manager.py --metadata-path ../app/metadata --create-union new_role base_role1 base_role2
```

### Multiple Role Union (unlimited)
```bash
python role_manager.py --metadata-path ../app/metadata --create-union super_user readonly customer_service analytics admin_helper
```

### How Union Roles Work:
1. **Field Union**: Combines all unique fields from base roles for each model
2. **Model Coverage**: Includes all models that any base role has access to
3. **No Duplication**: Automatically removes duplicate fields
4. **No Limit**: Can combine unlimited number of base roles

## 🗑️ Role Removal

Safely remove roles from all HML files:

```bash
python role_manager.py --metadata-path ../app/metadata --remove-role role_name
```

### Safety Features:
- 🔒 **Admin Protection**: Cannot remove `admin` or `Administrator` roles
- ⚠️ **Confirmation Required**: Must type "yes" (not just "y")
- 📊 **Progress Reporting**: Shows which files are being updated
- ✅ **Complete Removal**: Removes from both TypePermissions and ModelPermissions

### Example:
```bash
python role_manager.py --metadata-path ../app/metadata --remove-role admin
# Output: Error: Cannot remove protected role 'admin'
```

## 🔄 Automatic Backup System

The role manager automatically creates backups before any destructive operation to ensure your metadata is always protected.

### Default Backup Behavior
```bash
# Automatic backup created before making changes
python role_manager.py --metadata-path ../app/metadata --create-predefined

# Output:
[BACKUP] Creating automatic backup before making changes...
[BACKUP] Creating backup: backups/app_metadata_backup_20251006_172533
[OK] Backup created: backups/app_metadata_backup_20251006_172533
[INFO] Rollback instructions: backups/app_metadata_backup_20251006_172533_ROLLBACK.txt
```

### Skip Backup (When Needed)
```bash
# Use --no-backup to skip automatic backup
python role_manager.py --metadata-path ../app/metadata --create-predefined --no-backup

# Output:
[WARNING] Proceeding without backup (--no-backup flag used)
```

### Backup Directory Structure
```
backups/
├── app_metadata_backup_20251006_172533/     # Complete metadata backup
│   ├── ChinookAlbum.hml
│   ├── ChinookArtist.hml
│   └── ... (all metadata files)
└── app_metadata_backup_20251006_172533_ROLLBACK.txt  # Rollback instructions
```

### Rollback Instructions
Each backup includes a rollback instructions file with platform-specific commands:

```
HASURA DDN ROLE MANAGER - ROLLBACK INSTRUCTIONS
==================================================

Backup created: 2025-10-06 17:25:33
Original path: ../app/metadata
Backup path: backups/app_metadata_backup_20251006_172533

ROLLBACK COMMANDS:
--------------------

Linux/macOS:
  rm -rf ../app/metadata
  mv backups/app_metadata_backup_20251006_172533 ../app/metadata

Windows:
  rmdir /S /Q ../app/metadata
  move backups\app_metadata_backup_20251006_172533 ../app/metadata

VERIFICATION:
---------------
After rollback, verify with:
  python role_manager.py --metadata-path ../app/metadata --list-roles
```

### Backup Naming Convention
- **Format**: `{parent}_{directory}_backup_{timestamp}`
- **Example**: `../app/metadata` → `app_metadata_backup_20251006_172533`
- **Location**: `backups/` directory in current working directory

### Operations That Create Backups
- ✅ `--create-predefined` - Creating predefined roles
- ✅ `--create-union` - Creating union roles
- ✅ `--remove-role` - Removing roles
- ✅ `--apply-config` - Applying role configurations
- ✅ `--interactive` - Interactive role creation
- ❌ `--list-models` - Read-only (no backup needed)
- ❌ `--list-roles` - Read-only (no backup needed)

## 🛡️ Safety Features

### Admin Protection
```bash
python role_manager.py --metadata-path ../app/metadata --remove-role admin
# Output: Error: Cannot remove protected role 'admin'
```

### Confirmation Required
```
WARNING: This will remove role 'test_role' from ALL HML files.
This action cannot be undone!

Are you sure you want to remove role 'test_role'? (yes/N):
```

## 📁 File Structure

```
supergraph_dir/hasura-role-manager/
├── role_manager.py              # Main script
├── requirements.txt             # Dependencies
├── README.md                    # This file
├── role_config_template.json    # Configuration template
├── example_sales_role.json      # Example role config
├── example_union_role.json      # Example union role config
├── example_filtered_role.json   # Example role with filters
└── backups/                     # Automatic backups directory
    ├── app_metadata_backup_YYYYMMDD_HHMMSS/
    └── app_metadata_backup_YYYYMMDD_HHMMSS_ROLLBACK.txt
```

## 🔧 Directory Structure & Execution

### Expected Structure:
```
supergraph_dir/
├── hasura-role-manager/        # Role manager utility directory
│   ├── role_manager.py         # Main script
│   ├── requirements.txt        # Dependencies
│   ├── README.md              # This documentation
│   └── ... (other utility files)
├── app/metadata/              # Your Hasura metadata directory
│   ├── ChinookAlbum.hml
│   ├── ChinookArtist.hml
│   └── ... (other .hml files)
└── ... (other project files)
```

### Execution Options:

#### Option 1: From Role Manager Directory (Recommended)
```bash
cd supergraph_dir/hasura-role-manager
python role_manager.py --metadata-path ../app/metadata --list-models
```

#### Option 2: Copy Script to Project Root
```bash
cd supergraph_dir
copy hasura-role-manager\role_manager.py .
python role_manager.py --list-models
```

## 💡 Real-World Examples

### 1. E-commerce Platform

#### Customer Role
```json
{
  "role_name": "customer",
  "permissions": [
    {
      "model": "ChinookCustomer",
      "fields": ["customerid", "firstname", "lastname", "email"],
      "filter": "{\"customerid\": {\"_eq\": \"x-hasura-user-id\"}}"
    },
    {
      "model": "ChinookInvoice",
      "fields": ["invoiceid", "invoicedate", "total"],
      "filter": "{\"customerid\": {\"_eq\": \"x-hasura-user-id\"}}"
    }
  ]
}
```

#### Support Agent Role (Union)
```bash
python role_manager.py --metadata-path ../app/metadata --create-union support_agent customer_service readonly
```

### 2. SaaS Application

#### Tenant Admin Role
```json
{
  "role_name": "tenant_admin",
  "permissions": [
    {
      "model": "ChinookUsers",
      "fields": ["userId", "email", "name"],
      "filter": "{\"tenant_id\": {\"_eq\": \"x-hasura-tenant-id\"}}"
    }
  ]
}
```

### 3. Analytics Team Role (Union)
```bash
python role_manager.py --metadata-path ../app/metadata --create-union analytics_team analytics readonly
```

## 🚨 Important Notes

- ⚠️ **Working Directory**: The script looks for metadata files relative to where you run it from
- ⚠️ **File Paths**: All generated configuration files will be created in the current working directory
- ⚠️ **Permissions**: Ensure you have read/write permissions to the metadata directory
- ⚠️ **Backup**: Always backup your metadata before making changes

## 🔍 Troubleshooting

### Common Issues

#### 1. "No models found"
**Solution**: Check metadata path and ensure .hml files exist
```bash
ls ../app/metadata/*.hml
```

#### 2. "Permission denied"
**Solution**: Check file permissions
```bash
chmod 755 ../app/metadata/
```

#### 3. "Role not found"
**Solution**: List existing roles first
```bash
python role_manager.py --metadata-path ../app/metadata --list-roles
```

## 📈 Best Practices

1. **Start with predefined roles** to understand the structure
2. **Use configuration files** for complex roles that you might need to recreate
3. **Test roles** in your Hasura console after applying
4. **Rely on automatic backups** - the script creates them by default for safety
5. **Use filters** to implement row-level security
6. **Remove unused roles** to keep your metadata clean
7. **Use union roles** to combine existing permissions efficiently
8. **Admin roles are protected** - cannot be accidentally removed
9. **Keep backup directory** - don't delete `backups/` folder for rollback capability
10. **Use `--no-backup` sparingly** - only when you have external backup systems

## 🔄 Backup Management

### Automatic Backup Cleanup
The script doesn't automatically delete old backups. To manage backup storage:

```bash
# List all backups (Linux/macOS)
ls -la backups/

# Remove old backups (keep last 5)
ls -t backups/app_metadata_backup_* | tail -n +6 | xargs rm -rf

# Windows - list backups
dir backups\

# Windows - manual cleanup
rmdir /S backups\app_metadata_backup_20251001_120000
```

### Backup Best Practices
- ✅ **Keep recent backups** for quick rollback capability
- ✅ **Archive old backups** to external storage if needed
- ✅ **Test rollback procedures** in development environment
- ✅ **Document backup retention policy** for your team

## 🆘 Support

- **Examples**: Check the `example_*.json` files
- **Interactive Mode**: Use `--interactive` for guided role creation
- **Validation**: Script validates fields and provides warnings
- **Rollback**: Check `backups/` directory for rollback instructions

---

**✅ Safe by Default**: The script now creates automatic backups, making role management operations safe for production use!