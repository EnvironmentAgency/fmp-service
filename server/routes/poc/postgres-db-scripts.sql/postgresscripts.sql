CREATE TABLE reportType(
   id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   displayName text,
   uniqueName VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO public.reportType(
	 displayName,uniqueName)
	VALUES ( 'Product 4 Report template – Coastal Report','Coastal');

INSERT INTO public.reportType(
	  displayName,uniqueName)
	VALUES ( 'Product 4 Report template – Inland Report','Inland');

CREATE OR REPLACE FUNCTION public.reportType(uniqueName varchar(255))
RETURNS JSON Language 'sql'
COST 100
VOLATILE
AS $BODY$
SELECT row_to_json(reportType) as data from reportType where $1=uniqueName;
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

--Function to insert data into customerRequest TABLE
CREATE OR REPLACE FUNCTION public.createCustomerRequest(pointofinterest VARCHAR(300), requestedby varchar(300), reference varchar(300))
 RETURNS SETOF public.customerRequestInformation AS
      $BODY$
	  DECLARE
	    new_id integer;
        returnrec public.customerRequestInformation;
          BEGIN
	Insert into public.customerRequestInformation("Product4(Detailed Flood Risk)", "Requested By","Reference","Date") values( pointofinterest, requestedby, reference,now()) RETURNING id INTO new_id;
     FOR returnrec IN SELECT * FROM public.customerRequestInformation where id=new_id LOOP
            RETURN NEXT returnrec;
        END LOOP;
  END;
      $BODY$
      LANGUAGE 'plpgsql' VOLATILE
      COST 100;
----------------------------------------------------------------------------------------------------

CREATE TABLE public.contents
(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name Varchar(500) NOT NULL,
	reportTypeId integer REFERENCES reportType(id),
	isInland boolean
);
INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Flood Map Confirmation.',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Flood Map Extract (Zone 2 and Zone 3).',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Tidal Flood Levels(Data and Data Points).',1,FALSE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Tidal Flood Depths(Data and Defended/Undefended Maps).',1,FALSE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Fluvial Flood Levels(Data).',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Fluvial Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Fluvial Flood Levels(Data).',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Fluvial Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Climate Change Flood Levels(Data).',1,TRUE);
			
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Climate Change Flood Depths(Data and Defended/Undefended Maps).',1,TRUE);
	
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Defence Details.',1,TRUE);
			
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Historic Flood Levels(Data and Maps).',1,TRUE);
			
	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('•Additional Information.',1,TRUE);

	INSERT INTO public.contents(
	name,reportTypeId,isInland)
	VALUES ('The information provided is based on the best data available as of the date of this letter. You may feel it is appropriate to contact our office at regular intervals, to check whether any amendments/ improvements have been made to the data for this location. Should you contact us again, after a period of time, please quote the above reference in order to help us deal with your query.Please refer to the Open Government Licence which explains the permitted use of this information.',1,TRUE);

	
CREATE OR REPLACE FUNCTION public.contents()
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(contents)  as data FROM contents
$BODY$;

-------------------------------------------------------------------------
CREATE TABLE public.disclaimer
(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    data Varchar(2000) NOT NULL
);

INSERT INTO public.disclaimer(
	data)
	VALUES ('The information provided is based on the best data available as of the date of this letter.');

INSERT INTO public.disclaimer(
	data)
	VALUES ('You may feel it is appropriate to contact our office at regular intervals, to check whether any amendments/improvements have been made to the data for this location. Should you contact us again, after a period of time, please quote the above reference in order to help us deal with your query.');


INSERT INTO public.disclaimer(
	data)
	VALUES ('Please refer to the Open Government Licence which explains the permitted use of this information.');

CREATE OR REPLACE FUNCTION public.disclaimer()
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(disclaimer)  as data FROM disclaimer
$BODY$;


-------------------------------------------------------------------------
CREATE TABLE public.floodMapConfirmation
(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "heading" Varchar(300) NOT NULL,
	"sub-heading" VARCHAR(300) Not Null,
	"text" VARCHAR(2000) NOT NULL   
);
INSERT INTO public.floodMapConfirmation(
	"heading", "sub-heading", "text")
	VALUES ('Flood Map Confirmation', 'The Flood Map', 
	'Our Flood Map shows the natural floodplain for areas at risk from fluvial and tidal flooding. The floodplain is specifically mapped ignoring the presence and effects of flood defences. Although flood defences reduce the risk of flooding, they cannot completely remove that risk as they may be overtopped or breached during a flood event. The Flood Map shows the probability of a flood of a particular magnitude, or greater, occurring in any given year. This is known as the Annual Exceedance Probability (AEP). Flood Zone 3 indicates areas of land having a 1 in 100 or greater annual probability (1% AEP) of flooding from rivers, or a 1 in 200 or greater annual probability (0.5% AEP) of flooding from the sea. Flood Zone 2 indicates areas of land having up to a 1 in 1000 annual probability (0.1% AEP) of flooding from rivers or the sea. The Flood Map also shows the location of some flood defences and the areas that benefit from them.The Flood Map is intended to act as a guide to indicate the potential risk of flooding. When producing it we use the best data available to us at the time of completion, taking into account historic flooding and local knowledge. The Flood Map is updated on a quarterly basis to account for any amendments required. These amendments are then displayed on the internet at https://flood-map-for-planning.service.gov.uk/.');
CREATE OR REPLACE FUNCTION public.floodMapConfirmation()
    RETURNS json
    LANGUAGE 'sql'
    COST 100
    VOLATILE 
AS $BODY$
SELECT row_to_json(floodMapConfirmation) as data FROM floodMapConfirmation
$BODY$;
---------------------------------------------------------

--Function to insert data into customerRequest TABLE
Insert into customer