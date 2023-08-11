import axios from "axios";
import { useEffect, useState } from "react";
import "./Person.css"
import Swal from 'sweetalert2'
import EditModal from "./EditModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = ({ team, setTeam }) => {


    const [selectedItem, setSelectedItem] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTeam, setEditTeam] = useState(null)
    const [page, setPage] = useState(1);
    
    useEffect (() => {
        axios
        .get(`/team?_limit=3&_page=${page}`)
        .then((res) => setTeam(res.data))
        .catch((err) => {
          if(err.code === "ECONMABORTED"){
            alert("bağlantınız zaman aşımımn uğradı");
          }else{
            console.log("ERROR: " + err);
          }
        });
      }, [page]);
      console.log(team);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[1].value);

        const nameInput = e.target[0];
        const userNameInput = e.target[1];
        const name = nameInput.value.trim();
        const userName = userNameInput.value.trim();
        if (name && userName && selectedItem) {
            const newPerson = {
                id: new Date().getTime(),
                name: name,
                job: selectedItem,
                image: "https://xsgames.co/randomusers/avatar.php?g=pixel",
                userName: userName,
                newDate: new Date().toLocaleString(),
                info: "Collaborating with developers to ensure timely completion of software projects and overseeing code quality.",
                twitter: "https://twitter.com/username",
                email: "e-mail@.....com",
                linkedin: "https://www.linkedin.com/in/username/",
                github: "https://github.com/username",
                isDone: false
            };

            axios
                .post("/team", newPerson)
                .then(() => {
                    setTeam([...team, newPerson])
                    setSelectedItem("")
                })
                .catch(() =>
                    alert("sunucu bakımda sonra dene")
                );
            e.target[0].value = '';
            nameInput.value = '';
            userNameInput.value = '';
        }
        else {
            toast.error("Lütfen tüm alanları doldurunuz...", { autoClose: 2000, position: "top-center", theme: "colored" });
        }

    }

    const handleDeleteModal = (person) => {
        Swal.fire({
            icon: 'warning',
            title: 'Emin misiniz?',
            text: `${person.name.toUpperCase()}' adlı personeli takımdan çıkarmak istediğinize emin misiniz?'`,
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: 'Evet, Sil',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(person.id);
            } else {
                // Silme işlemi iptal edildi
            }
        });
    };
    const handleDelete = (deleteId) => {
        axios.delete(`/team/${deleteId}`)
            .then(() => {
                const deletePerson = team.filter((item) => item.id !== deleteId);
                setTeam(deletePerson);
            })
            .catch(() => alert("silme işlemi başarısız"))

    };

    //edit işlemi
    const handleFavorite = (person) => {
        const updateTeam = { ...person, isDone: !person.isDone };
        axios.put(`/team/${person.id}`, updateTeam)
            .then(() =>
                setTeam(team.map((item) => item.id === person.id ? updateTeam : item
                ))
            );
        if (person.isDone === false) {
            toast.success("Team personeline görev tanımladınız... ", { autoClose: 2000, position: "top-center", theme: "colored" })
        } else {
            toast.warning("Personelden görevi kaldırdınız", { autoClose: 2000, position: "top-center", theme: "colored" })
        }

    }
    const handleEditModal = (person) => {
        setEditTeam(person)
        setShowEditModal(true);

    };
    const handleEditTeam = () => {
        console.log(editTeam);
        const updateEdit = {
            ...team,
            id: new Date().getTime(),
            name: editTeam.name,
            job: editTeam.job,
            image: editTeam.image,
            userName: editTeam.userName,
            newDate: new Date().toLocaleString(),
            info: "Collaborating with developers to ensure timely completion of software projects and overseeing code quality.",
            twitter: "twitter.com/username",
            email: "email address",
            linkedin: "linkedin.com/in/username/",
            github: "github.com/username",
            isDone: false
        };

        axios.put(`/team/${editTeam.id}`, updateEdit)
            .then(() => {
                const editing = [...team];
                const index = editing.findIndex((i) => i.id === editTeam.id);
                console.log(index);
                editing[index] = editTeam;
                setTeam(editing)
                setShowEditModal(false)
            }
        );
    }

    return (
        <section id="team" class="pb-5">
            <div class="container">
                <h4 class="section-title text-warning ">OUR SOFTWARE TEAM</h4>
                <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center gap-1 my-4 mx-5">
                    <input className="form-control" type="text" placeholder="Name and Surname " />
                    <input className="form-control" type="text" placeholder="Username" />
                    <div className="dropdown">
                        <select
                            className="btn btn-info dropdown-toggle text-start"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            value={selectedItem} // burada value özelliğine selectedItem durumunu atıyoruz
                            onChange={(e) => setSelectedItem(e.target.value)} // bu şekilde kullanıcı seçim yaptığında selectedItem durumunu güncelliyoruz
                        >
                            <option value="" disabled selected>
                                {selectedItem || "Software Developer"}
                            </option>
                            <option value="Front-End Developer">Front-End Developer</option>
                            <option value="Back-End Developer">Back-End Developer</option>
                            <option value="Other Person">Other</option>
                        </select>

                        {/* Add more dropdown items as needed */}

                    </div>
                    <button className="btn btn-primary">Gönder</button>
                </form>

                <div class="row">
                    {!team && <h2>Looding</h2>}
                    {team?.map((person) => (
                        <div class="col-xs-12 col-sm-6 col-md-4" key={person.id}>
                            <div class="image-flip" >
                                <div class="mainflip flip-0 ">
                                    <div class="frontside">
                                        <div class="card rounded-4">
                                            <div class="card-body text-center">
                                                <img class=" img-fluid" src={person.image} alt="card image" />
                                                <h4 class="card-title text-capitalize">{person.name}</h4>
                                                <p class="card-text">{person.job}</p>
                                                <a class="btn">{person.isDone ? <i class="fa fa-check text-success fs-2"></i> : <i class="fa fa-plus text-danger fs-2"></i>}</a>
                                                <div className="d-flex align-items-center justify-content-center flex-column">
                                                    {person.isDone ? <p className="text-success">Assigned a Task </p> : <p className="text-warning">"Free"</p>}
                                                    {person.isDone ? <p className="text-success">{person.newDate}</p> : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="backside ">
                                        <div class="card rounded-4">
                                            <div class="card-body text-center mt-1">
                                                <h4 class="card-title text-capitalize">{person.userName}</h4>
                                                <p class="card-text person-info ">{person.info}</p>
                                                <ul class="list-inline ">
                                                    <li class="list-inline-item">
                                                        <a class="social-icon text-xs-center  fs-3" target="_blank" href={person.linkedin}>
                                                            <i class="fa fa-linkedin"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <a class="social-icon text-xs-center fs-3" target="_blank" href={person.twitter}>
                                                            <i class="fa fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <a class="social-icon text-xs-center fs-3" target="_blank" href={person.email}>
                                                            <i class="fa fa-envelope"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <a class="social-icon text-xs-center fs-3" target="_blank" href={person.github}>
                                                            <i class="fa fa-github"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="d-flex align-items-center justify-content-center mx-2 gap-1">
                                                    <button className="btn btn-warning px-2"
                                                        onClick={() => handleEditModal(person)}

                                                    >Edit</button>
                                                    <button className={`btn px-1  ${person.isDone ? "btn-success" : "btn-info"} `}
                                                        onClick={() => handleFavorite(person)}>
                                                        {person.isDone ? "Assigned Task" : "Assign Task"}
                                                    </button>
                                                    <button onClick={() => handleDeleteModal(person)} className="btn btn-danger px-2">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className= "d-flex align-items-center justify-content-center btn-group" >
                        <button className=" rounded-end-0 px-4" disabled ={page=== 1}
                            onClick={() =>{
                            if(page=== 1) return; setPage(page - 1);}}>Back</button>
                        <button className="text-center text-bg-warning text-white px-2 rounded-0">Page: {page}</button>
                        <button className="px-2 rounded-start-0" onClick={() => setPage(page + 1)} disabled ={page === 2}>Forward</button>
                    </div>

                </div>
            </div>
            {showEditModal && <EditModal
                editTeam={editTeam}
                setEditTeam={setEditTeam}
                setShowEditModal={setShowEditModal}
                handleEditTeam={handleEditTeam}

            />}
            <ToastContainer />
        </section>
    );
}

export default Card;