SET check_function_bodies = false;
CREATE TABLE public.compensation (
    comp_id integer NOT NULL,
    comp_base integer NOT NULL,
    comp_variable integer NOT NULL,
    comp_emp integer
);
CREATE SEQUENCE public.compensation_comp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.compensation_comp_id_seq OWNED BY public.compensation.comp_id;
CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    emp_first_name text NOT NULL,
    emp_last_name text NOT NULL,
    emp_email text NOT NULL,
    emp_team integer NOT NULL,
    emp_manager integer
);
CREATE SEQUENCE public.employees_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.employees_emp_id_seq OWNED BY public.employees.emp_id;
CREATE TABLE public.teams (
    team_id integer NOT NULL,
    team_name text NOT NULL,
    team_manager integer NOT NULL
);
CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;
ALTER TABLE ONLY public.compensation ALTER COLUMN comp_id SET DEFAULT nextval('public.compensation_comp_id_seq'::regclass);
ALTER TABLE ONLY public.employees ALTER COLUMN emp_id SET DEFAULT nextval('public.employees_emp_id_seq'::regclass);
ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);
ALTER TABLE ONLY public.compensation
    ADD CONSTRAINT compensation_pkey PRIMARY KEY (comp_id);
ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);
ALTER TABLE ONLY public.compensation
    ADD CONSTRAINT compensation_comp_emp_fkey FOREIGN KEY (comp_emp) REFERENCES public.employees(emp_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_emp_id_fkey FOREIGN KEY (emp_id) REFERENCES public.employees(emp_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_team_manager_fkey FOREIGN KEY (team_manager) REFERENCES public.employees(emp_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
