-- Return a table with a list of all Quidditch matches where Ravenclaw is the Away team.

-- This table should have two columns: "Home" and "Away" with the names of the houses in each column.

-- Note: A house can not play against itself.

SELECT name as Home, name as Away FROM houses WHERE id IN (SELECT home_team FROM House WHERE id = (SELECT id FROM houses WHERE name = 'Ravenclaw'));