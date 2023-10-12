import getAllNeos from "@/helpers/getAllNeos";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PageHeader from '@/app/header';

export default async function Home() {
  const neosData: Promise<Neo> = getAllNeos();
  const neos = await neosData
  let neoDataObject: { id: string; neo_reference_id: string; name: string; nasa_jpl_url: string; absolute_magnitude_h: number; estimated_diameter: { kilometers: { estimated_diameter_min: number; estimated_diameter_max: number; }; meters: { estimated_diameter_min: number; estimated_diameter_max: number; }; miles: { estimated_diameter_min: number; estimated_diameter_max: number; }; feet: { estimated_diameter_min: number; estimated_diameter_max: number; }; }; is_potentially_hazardous_asteroid: boolean; close_approach_data: { close_approach_date: string; close_approach_date_full: string; epoch_date_close_approach: number; relative_velocity: { kilometers_per_second: string; kilometers_per_hour: string; miles_per_hour: string; }; miss_distance: { astronomical: string; lunar: string; kilometers: string; miles: string; }; orbiting_body: string; }[]; is_sentry_object: boolean; }[][] = [];
  Object.values(neos.near_earth_objects).forEach(key => neoDataObject.push(key));
  const formattedData = neoDataObject[0];

  const mainContent = (
    <>
      <PageHeader />
      <TableContainer component={Paper}>
      <Table>
        <TableHead sx={({ m: 1 })}>
          <TableRow sx={({ fontWeight: 'bold' })}>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Est Diamater in Meters</TableCell>
            <TableCell>Is Potentially Hazardous?</TableCell>
            <TableCell>Is Sentry Object?</TableCell>
            <TableCell>Velocity (km/h)</TableCell>
            <TableCell>Miss Distance (km)</TableCell>
            <TableCell>Visual Magnitude</TableCell>
            <TableCell>Close Approach Date/Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(formattedData) ? formattedData.map(neo => {
            return (
              <>
                <TableRow key={neo.id}>
                  <TableCell>{neo.id}</TableCell>
                  <TableCell>{neo.name}</TableCell>
                  <TableCell>{neo.estimated_diameter.meters.estimated_diameter_max - neo.estimated_diameter.meters.estimated_diameter_min}</TableCell>
                  <TableCell>{neo.is_potentially_hazardous_asteroid ? "True" : "False"}</TableCell>
                  <TableCell>{neo.is_sentry_object ? "True" : "False"}</TableCell>
                  <TableCell>{neo.close_approach_data[0].relative_velocity.kilometers_per_hour}</TableCell>
                  <TableCell>{neo.close_approach_data[0].miss_distance.kilometers}</TableCell>
                  <TableCell>{neo.absolute_magnitude_h}</TableCell>
                  <TableCell>{neo.close_approach_data[0].close_approach_date_full}</TableCell>
                </TableRow>
              </>
            );
          }) : (
            <>
              <h1>No data found!</h1>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer></>  
  )
  return (
    mainContent
  )
}
