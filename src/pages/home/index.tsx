
import {FaInstagram,FaLinkedin} from 'react-icons/fa'
import { Social } from "../../components/social";

import {db} from '../../services/firebaseConnection';
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore';

import { useEffect, useState } from 'react';

interface Linksprops{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;
}

interface SocialLinksProps{
    instagram:string;
    linkedIn: string
}
export function Home(){

    const [links,setLinks] = useState<Linksprops[]>([]);
    const [social,setSocial] = useState<SocialLinksProps>();

useEffect(() => {

    function loadLinks(){
        const linksRef = collection(db, 'Links');
        const queryRef = query(linksRef, orderBy('created' , 'asc'))

        getDocs(queryRef)
        .then((snapshot) => {
            const list = [] as Linksprops[];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(list)
        })

    }

    loadLinks();


} , [])


useEffect(() => {
    
        function loadSocial(){
            const docRef = doc(db , 'social' , 'link');
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocial({
                        instagram: snapshot.data()?.instagram,
                        linkedIn: snapshot.data()?.linkedIn
                    })
                }
                
            }) 

        }

        loadSocial();
        console.log(social)

}, [])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white m mt-20">Vitor Torquato</h1>
            <span className="text-gray-50 mb-5 mt-3">See my links 👇 </span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
               {
                links.map((link) => (
                    <section key={link.id}
                    style={{backgroundColor: link.bg}} 
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a href={link.url} target='_blank'>
                        <p 
                        style={{color: link.color}}
                        className="text-base md:text-lg">{link.name}</p>
                    </a>
                </section>
                ))
               }

               {
                social && Object.keys(social).length > 0 && (
                     <footer className="flex justify-center gap-3 my-4">
                    <Social 
                        url={social?.linkedIn}
                    
                        
                    >
                    <FaLinkedin size={35} color='#fff'/>
                    </Social>

                    <Social
                    url={social?.instagram}
                    >
                    <FaInstagram size={35} color='#FFF'/>    

                    </Social>
                </footer>
                )
            }
           
            </main>
        </div>
    )
}