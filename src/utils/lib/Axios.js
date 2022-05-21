import axios from "axios";
import hostname from '../data/hostname.json'

const indexvalue = Math.floor(Math.random() * hostname.data.length);
const HOSTNAME = hostname.data[indexvalue];
const App_name = 'parag.noobdev';

console.log(HOSTNAME + "from axios lib");
export default  axiosInstance= axios.create({
    baseURL:HOSTNAME,
    params:{
        App_name
    },
})
