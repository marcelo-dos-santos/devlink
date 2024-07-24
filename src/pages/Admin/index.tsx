import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO");
        setNameInput("");
        setUrlInput("");
        setTextColorInput("#f1f1f1");
        setBackgroundColorInput("#121212");
      })
      .catch((error) => {
        console.log("ERRO AO CADASTRAR NO BANCO" + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const confirmar = confirm("Deseja realmente deletar esse link?");
    if (confirmar) {
      const docRef = doc(db, "links", id);
      await deleteDoc(docRef);
    } else {
      return;
    }
  }

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label htmlFor="linkName" className="text-white font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          id="linkName"
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label htmlFor="urlLink" className="text-white font-medium mt-2 mb-2">
          Url do link
        </label>
        <Input
          id="urlLink"
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label
              htmlFor="fundoLink"
              className="text-white font-medium mt-2 mb-2"
            >
              Cor do link
            </label>
            <Input
              id="fundoLink"
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor="corLink"
              className="text-white font-medium mt-2 mb-2"
            >
              Fundo do link
            </label>
            <Input
              id="corLink"
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label
              htmlFor="preview"
              className="text-white font-medium mt-2 mb-3"
            >
              Veja como está ficando:
            </label>
            <article
              id="preview"
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed p-1 rounded bg-neutral-900"
            >
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
