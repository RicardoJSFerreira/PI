USE PI;
DROP PROCEDURE IF EXISTS teste;
DROP PROCEDURE IF EXISTS teste2;
DROP PROCEDURE IF EXISTS add_slot_teste;


    -- =============================================
-- Description: get information about a requested slot
-- Type: Procedure
-- Parameters: 
--   @in_idUser - service provider identification number
-- Returns: Information about the request slot
-- =============================================


DELIMITER &&  
CREATE PROCEDURE teste (IN in_idUser INT)  
BEGIN  
	
    DECLARE os JSON DEFAULT '[]';

    
    -- get the occupied schedule
    SET os = (SELECT serviceprovider.occupiedSchedule FROM serviceprovider 
			WHERE serviceprovider.idSP = in_idUser );
	
    SET os = IF (os IS NULL, '[]', os);
    
	select json_extract(j1, '$.id') AS id, user.name, json_extract(j1, '$.date_begin') AS date_begin, json_extract(j1, '$.date_end') AS date_end, 
		json_extract(j1, '$.idCategory') AS categories, json_extract(j1, '$.date_requested') AS date_requested from json_table(os, '$[*]' columns ( j1 json path '$')) as jt 
		inner join user ON json_extract(j1, '$.id') = user.idUser
		where json_extract(j1, '$.occupied') = "0";

	
END &&  
DELIMITER ;

DELIMITER &&  
CREATE PROCEDURE teste2 (IN in_idUser INT)  
BEGIN  
	
    DECLARE os JSON DEFAULT '[]';

    
    -- get the occupied schedule
    SET os = (SELECT serviceprovider.occupiedSchedule FROM serviceprovider 
			WHERE serviceprovider.idSP = in_idUser );
	
    SET os = IF (os IS NULL, '[]', os);
    
	select user.name, j1 from json_table(os, '$[*]' columns ( j1 json path '$')) as jt 
		inner join user ON json_extract(j1, '$.id') = user.idUser
		where json_extract(j1, '$.occupied') = "0";

	
END &&  
DELIMITER ;

-- CALL teste(53);
CALL teste2(147);
-- CALL info_requested_slots_v2(53);


 
DELIMITER &&  
CREATE PROCEDURE add_slot_teste (IN in_idUser INT, IN in_slot JSON)  
BEGIN  
	
    DECLARE os JSON DEFAULT '[]';
    -- get the occupied schedule
    SET os = (SELECT serviceprovider.occupiedSchedule FROM serviceprovider 
			WHERE serviceprovider.idSP = in_idUser );
   SET os = IF (os IS NULL, '[]', os);
    
	UPDATE pi.serviceprovider SET
		serviceprovider.occupiedSchedule= CASE 
					WHEN in_slot IS NOT NULL AND os IS NOT NULL
                    THEN JSON_MERGE_PRESERVE(os,in_slot)
                    ELSE serviceprovider.occupiedSchedule
                    END
	WHERE serviceprovider.idSP = in_idUser;
END &&  
DELIMITER ;

CALL add_slot_teste(59,  '{
        "id": "37",
        "date_end": "2022-01-08 18:00:00",
        "occupied": "1",
        "date_begin": "2022-01-08 17:30:00",
        "idCategory": "3",
        "date_requested": "2022-01-02 19:12:18"
    }');
    
    
    
    

CALL info_requested_slots(53);
CALL info_requested_slots(54);

SELECT LENGTH("[4]");

-- user 78 tem free trial e 1 id subscription e company 153
CALL update_serviceProvider_endSub(78,3);
CALL update_company_endSub(153,8);


