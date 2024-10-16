import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import {db} from '../../services/firebaseConnection';
import {
    setDoc,
    doc,
    getDoc

} from 'firebase/firestore'


export function NetWorks(){

    const [instagram,setInstagram] = useState('');
    const [linkedIn,setLinkedIn] = useState('');


    function handleRegister(e:FormEvent){
        e.preventDefault();
        //addDoc cadastra algo novo
        //setDoc sustitui os items que ja existem , ou seja, fazer o update 
        setDoc(doc(db , 'social' , 'link') , {
           
            instagram: instagram,
            linkedIn: linkedIn
        }).then(() => {
            
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
           
        function loadLinks(){
                const docRef = doc(db, 'social' , 'link');
                getDoc(docRef)
                .then((snapshot) => {
                    if(snapshot.data() !== undefined){
                        setInstagram(snapshot.data()?.instagram)
                        setLinkedIn(snapshot.data()?.linkedIn)
                    }
                })
            }

            loadLinks();

    },[])

    return(
        <div 
        className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header/>

            <h1
            className="text-white text-2xl font-medium mt-8 mb-4"
            >MY Social Medias</h1>

            <form 
            onSubmit={handleRegister}
            className="flex flex-col max-w-xl w-full"
            >
                <label
                className="text-white font-medium mt-2 mb-2"
                >Instaram</label>
                <Input
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                type="url"
                placeholder="Type instagram URL"
                />

                <label
                className="text-white font-medium mt-2 mb-2"
                >LinkdeIn</label>
                <Input
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                type="url"
                placeholder="Type LinkedIn URL"
                />



                <button
                type="submit"
                className="text-white bg-blue-600 h-9 rounded-md flex items-center justify-center mt-3 mb-7 font-medium"
                >
                    Save Links
                </button>


            </form>
        </div>
    )
}