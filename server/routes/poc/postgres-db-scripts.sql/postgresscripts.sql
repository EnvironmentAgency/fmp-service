CREATE TABLE product4ReportType(
   id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO public.product4ReportType(
	 name)
	VALUES ( 'Coastal');

INSERT INTO public.product4ReportType(
	 name)
	VALUES ( 'Inland');
	

CREATE OR REPLACE FUNCTION public.product4ReportType(name varchar(255))
RETURNS JSON Language 'sql'
COST 100
VOLATILE
AS $BODY$
SELECT row_to_json(product4ReportType) as data from product4ReportType where $1=name;
$BODY$;
----------------------------------------------------------------------------------------
CREATE TABLE public.customerRequestInformation
(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Product4(Detailed Flood Risk)" Varchar(300) NOT NULL,
	"Requested By" VARCHAR(300) Not Null,
	"Reference" VARCHAR(300),
	"Date" Date   
);
INSERT INTO public.customerRequestInformation(
	"Product4(Detailed Flood Risk)", "Requested By", "Reference", "Date")
	VALUES ('2 Burcot Road', 'Hari Gillala', 'WarringtonReference',now());
CREATE OR REPLACE FUNCTION public.customerRequestInformationById(id integer)
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT row_to_json("customerrequestinformation") as data FROM public."customerrequestinformation" $1 =id
$BODY$;
----------------------------------------------------------------------------------------------------

CREATE TABLE public.contents
(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name Varchar(500) NOT NULL,
	product4ReportTypeId integer REFERENCES product4ReportType(id),
	isInland boolean
);
INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Flood Map Confirmation.',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Flood Map Extract (Zone 2 and Zone 3).',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Tidal Flood Levels(Data and Data Points).',1,FALSE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Tidal Flood Depths(Data and Defended/Undefended Maps).',1,FALSE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Fluvial Flood Levels(Data).',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Fluvial Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Fluvial Flood Levels(Data).',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Fluvial Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Climate Change Flood Levels(Data).',1,TRUE);
			
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Climate Change Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Defence Details.',1,TRUE);
			
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Historic Flood Levels(Data and Maps).',1,TRUE);
			
	INSERT INTO public.contents(
	name,product4ReportTypeId,isInland)
	VALUES ('•Additional Information.',1,TRUE);
	
CREATE OR REPLACE FUNCTION public.contentsForCoastal()
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(contents)  as data FROM contents
$BODY$;

CREATE OR REPLACE FUNCTION public.contentsForInLand()
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(contents)  as data FROM contents where isInland=TRUE
$BODY$;
-------------------------------------------------------------------------