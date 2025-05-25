import { PageProps } from "$fresh/server.ts";
import HomePage from "../../components/HomePage.tsx";

//Hacer el type con datos a mostrar en la página para los props que devolvera el handler

const Page = (props:PageProps) => {
    const userdata = props.data;
<HomePage juegos={"CORREGIR"}/>
}

export default Page;