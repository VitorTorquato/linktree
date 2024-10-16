import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import {FiTrash} from 'react-icons/fi'

import {db} from '../../services/firebaseConnection'

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'


interface Linksprops{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;
}

export function Admin(){
   
    const [nameInput,setNameInput] = useState('');
    const [urlInput,setUrlInput] = useState('');
    const [textColor,setTextColor] = useState('#f1f1f1')
    const [bgColorInput,setBgColorInput] = useState('#121212');

    const [links,setLinks] = useState<Linksprops[]>([])

    function handleRegister(e:FormEvent){
        e.preventDefault();
        if(!nameInput || !urlInput){
            alert('Fill all fields')
            return;
        }
        //adicionando no banco de dados 
        addDoc(collection(db, 'Links'), {
            name:nameInput,
            url: urlInput,
            bg: bgColorInput,
            color:textColor,
            created: new Date()
        }).then(() => {
            console.log('well done')
            setNameInput('');
            setUrlInput('');
        }).catch((error) => {
            console.log(error)
        })
    }

    async function handleDeleteLink(id:string){
        const docRef = doc(db , 'Links' , id);
        await deleteDoc(docRef);
        
    }

    useEffect(() => {
            
        const linksRef = collection(db, 'Links');
        const queryRef = query(linksRef , orderBy('created' , 'asc'));

        const unsub = onSnapshot(queryRef, (snapshot) => {
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

            setLinks(list);
        })

        return () => {
            unsub()
        }
       
    },[])


    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">link Name</label>
                
                <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Type the name of your link"
                />

                <label className="text-white font-medium mt-2 mb-2">URL</label>
                
                <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Type the URL"
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">Text color</label>

                    <input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)} 
                    type="color"
                     />
                    </div>

                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">BackGround</label>

                    <input
                    value={bgColorInput}
                    onChange={(e) => setBgColorInput(e.target.value)} 
                    type="color"
                     />
                    </div>
                </section>

               {
                nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-3">Preview :</label>
    
                    <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px py-3"
    
                    style={{marginBottom:8 , marginTop: 8 , backgroundColor: bgColorInput}}
                    >
                        <p style={{color:textColor}}>{nameInput}</p>
                    </article>
                    </div>
    
                )
               }
                <button
                
                type="submit"
                className=" mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
                >Add Link</button>
            </form>


            <h2
            className="fontt-bold text-white mb-4 text-2xl"
            >
                My Links
            </h2>

               {
             

                links.map((link) => (
                    <article key={link.id} className="flex justify-between items-center w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none"
                    style={{backgroundColor :link.bg , color: link.color}}
                    >
                        <p>{link.name}</p>
                        <div>
                            <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="border border-dashed p-1 rounded"
                            >
                                    <FiTrash size={18} color="#fff"/>
                            </button>
                        </div>
                    </article>
                ))
                    
                
               }

        </div>
    )
}