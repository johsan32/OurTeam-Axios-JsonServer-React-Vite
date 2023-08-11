const EditModal = ({ setShowEditModal, editTeam, setEditTeam, handleEditTeam }) => {
    return (
      <div className="card mb-2 modal">
        <div className="card-body modal-info">
          <h5 className="card-title">
            <span className="fw-light">"{editTeam.userName.toUpperCase()}" adlı personelin bilgilerini düzenliyorsunuz.</span>{" "}
          </h5>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-column flex-grow-1 gap-3">
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-user fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.name}
                  onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-user-secret fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control  ms-2"
                  value={editTeam.userName}
                  onChange={(e) => setEditTeam({ ...editTeam, userName: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-briefcase fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control  ms-2"
                  value={editTeam.job}
                  onChange={(e) => setEditTeam({ ...editTeam, job: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-camera fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control  ms-2"
                  value={editTeam.image}
                  onChange={(e) => setEditTeam({ ...editTeam, image: e.target.value })}
                />
              </div>
             
            </div>
            <div className="d-flex flex-column flex-grow-1 gap-3">
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-linkedin fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.linkedin}
                  onChange={(e) => setEditTeam({ ...editTeam, linkedin: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-github fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.github}
                  onChange={(e) => setEditTeam({ ...editTeam, github: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-twitter fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.twitter}
                  onChange={(e) => setEditTeam({ ...editTeam, twitter: e.target.value })}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-envelope fs-4 text-info"></i>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.email}
                  placeholder="emaili giriniz"
                  onChange={(e) => setEditTeam({ ...editTeam, email: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
                <i className="fa fa-info-circle fs-4 text-info"></i>
                <textarea
                  type="text"
                  className="form-control ms-2"
                  value={editTeam.info}
                  onChange={(e) => setEditTeam({ ...editTeam, info: e.target.value })}
                />
              </div>
          <div className="d-flex align-items-center justify-content-center gap-3 mt-2">
            <button className="btn btn-danger" onClick={handleEditTeam}>
              Kaydet
            </button>
            <button onClick={() => setShowEditModal(false)} className="btn btn-warning">
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditModal;
  