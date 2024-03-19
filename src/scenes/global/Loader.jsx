import { CircularProgress } from "@mui/material";

const Loader = () => {
    const styles = {
        loaderContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh', // Adjust as needed
        },
      };
    
    return ( 
        <div style={styles.loaderContainer}>
        <CircularProgress color="secondary" />
        <div>Loading...</div>
      </div>
     );
}
 
export default Loader;