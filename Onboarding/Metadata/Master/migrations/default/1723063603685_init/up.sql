SET check_function_bodies = false;
CREATE TABLE public.initiatives (
    init_id integer NOT NULL,
    init_name text NOT NULL,
    init_owner integer NOT NULL,
    init_description text NOT NULL
);
COMMENT ON TABLE public.initiatives IS 'Org wide initiatives';
CREATE SEQUENCE public.initiatives_init_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.initiatives_init_id_seq OWNED BY public.initiatives.init_id;
CREATE TABLE public.projects (
    prj_id integer NOT NULL,
    prj_name text NOT NULL,
    prj_team integer NOT NULL,
    prj_desc text NOT NULL,
    prj_lead integer NOT NULL
);
COMMENT ON TABLE public.projects IS 'Org Wide Projects';
CREATE SEQUENCE public.projects_prj_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.projects_prj_id_seq OWNED BY public.projects.prj_id;
ALTER TABLE ONLY public.initiatives ALTER COLUMN init_id SET DEFAULT nextval('public.initiatives_init_id_seq'::regclass);
ALTER TABLE ONLY public.projects ALTER COLUMN prj_id SET DEFAULT nextval('public.projects_prj_id_seq'::regclass);
ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_pkey PRIMARY KEY (init_id);
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (prj_id);
