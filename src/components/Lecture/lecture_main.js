import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import point from "../../assets/point.png";
import "./lecture_main.css";
import "react-icons/fa";
import {
  MdLocationOn,
  MdAccessTime,
  MdToday,
  MdChromeReaderMode,
  MdSubdirectoryArrowRight,
} from "react-icons/md";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import ParticipantList from './participant_list';
import Repo_main from '../repository/repo_main';

class Lecture_main extends Component {

  constructor(props){
    super();
    this.state=props.history.location.state.detail;
    this.state.pointer=0;
    this.state.instructor=null
    this.getInstructorData(props.history.location.state.detail.lecturer_id);
  }

  state = {
  };

  async register(){
    var uid=localStorage.getItem("userID");
    await axios
      .post(`https://aglm.herokuapp.com/register`, {
        uid: uid,
        lecture_id: this.state.lecture_id
      }).then((res) => {
        var list=this.state.registered;
        list.push(uid);
        this.setState({ registered: list  });
      });
    console.log(this.state.registered);
  }

  async cancel(){
    var uid=localStorage.getItem("userID");
    await axios
      .post(`https://aglm.herokuapp.com/remove`, {
        uid: uid,
        lecture_id: this.state.lecture_id
      }).then((res) => {
        var list=this.state.registered;
        for(var i=0;i<list.length;i++){
          if(list[i]===uid)
            break;
        }
        list.splice(i, 1);
        this.setState({ registered: list  });
      });
      console.log(this.state.registered);
  }

  changePointer(a){
    console.log(this.state.pointer);
    console.log(a);
    console.log(this.state.pointer===a);
    if(this.state.pointer===a){
      this.setState({pointer:0});
    }
    else{
      this.setState({pointer:a});
    }
    console.log(this.state.pointer);
  }

  async getInstructorData(id){
    await axios
      .post(`https://aglm.herokuapp.com/getLecturer`, {
        id: id,
      }).then((res) => {
        this.setState({ instructor:res.data });
      });
  }

  render() {
    return (
      <div>
        <div
          id="toplectureststbar"
          styles={{
            alignItems: "horizontal",
            display: "flex",
            marginLeft: "2px",
            flexDirection: "row",
            padding: "3px",
            alignContent: "left",
          }}
        >
          <div
            id="lecturestat"
            style={{
              alignContent: "left",
              padding: "10px",
              fontSize: "18px",
              textAlign: "left",
              fontweight: "bold",
              color: "#797979",
              fontFamily: "Roboto",
              fontWeight: "bolder",
            }}
          >
            <MdSubdirectoryArrowRight /> {this.state.lecturestatus}
          </div>
        </div>
        <div class="TOPDETAILHOLDER">
          <div
            id="title"
            style={{
              alignContent: "left",
              padding: "10px",
              paddingLeft:"20px",
              fontSize: "40px",
              textAlign: "left",
              fontWeight: "bolder",
            }}
          >
            {this.state.title}
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <div
            class="gradient_color "
            style={{
              width:"100%",
              backgroundImage: "linear-gradient(to right, yellow , red)",
              height: "200px",
            }}
          >
            <div className="coulmn righttop">
              <div style={{ width:"65%"}} >
                <div
                  id="Organizer"
                  style={{
                    alignContent: "left",
                    padding: "20px",
                    fontSize: "30px",
                    textAlign: "left",
                    fontFamily: "Charcoal",
                    fontWeight: "bold",
                    color: "#525252",
                  }}
                >
                  Organizer : {this.state.organizer}
                </div>
                <div
                  id="registrations"
                  style={{
                    alignContent: "left",
                    padding: "20px",
                    fontWeight: "bold",
                    fontSize: "25px",
                    textAlign: "left",
                    color: "#525252",
                  }}
                >
                  {this.state.regcount} registrations
                </div>
              </div>
            </div>
            <div
              className="Poster"
              style={{
                marginTop: "-270px",
                marginRight:"40px",
                display: "flex",
                justifyContent: "flex-end",
                // maxHeight:"50px",
                // height:"50px",
                // width:"200px",
              }}
            >
              <img
                className="poster"
                src={this.state.poster}
                alt="Logo"
              />
            </div>
          </div>
        </div>
        <Navbar style={{ borderBottom: "1px solid black", padding: "5px" }}>
          <Nav.Link href="#about" style={{ fontWeight: (this.state.pointer==0)?"bold":"normal", color: (this.state.pointer==0)?"#ffa600":"gray" }}
          onClick={this.changePointer.bind(this,0)}>
            About
          </Nav.Link>
          <Nav.Link href="#instructors" style={{ color: "gray" }}>
            Instructor
          </Nav.Link>
          <Nav.Link href="#syllabus" style={{ color: "gray" }}>
            Syllabus
          </Nav.Link>
          <Nav.Link href="#requirements" style={{ color: "gray" }}>
            Requirements
          </Nav.Link>
          <Nav.Link href="#registration" style={{ color: "gray" }}>
            Registration
          </Nav.Link>
          {(this.props.type===('ADMIN'))?<div id="spl_button" style={{ cursor:"pointer",backgroundColor:"orange", color:"white",padding:"5px",borderRadius:"5px",fontWeight:"bold",marginLeft:"10px",marginRight:"30px"}}
            onClick={this.changePointer.bind(this,5)}>
            {(this.state.pointer!=5)?"Show Participant List":"Close Participant List"}
          </div>:<div/>}
          {<div style={{ cursor:"pointer",backgroundColor:"orange", color:"white",padding:"5px",borderRadius:"5px",fontWeight:"bold"}}
            onClick={this.changePointer.bind(this,6)}>
            {(this.state.pointer!=6)?"Show Repository":"Close Repository"}
          </div>}
        </Navbar>
        {(this.state.pointer===5)?<ParticipantList lecture_id={this.state.lecture_id} registered={this.state.registered}/>:
          (this.state.pointer===6)?<Repo_main admin={this.props.type===('ADMIN')} files={this.state.repository} lecture_id={this.state.lecture_id}/>:
        <div >
          <div style={{display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div class="column left_ltmn" style={{ color: "gray",width:"70%" }}>
              {/* <h2>Column 1</h2> */}
              <div
                id="about"
                style={{
                  padding: "20px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#282c34",
                  textAlign: "left",
                }}
              >
                About this Lecture
              </div>
              <div
                id="aboutDetailed"
                style={{
                  textAlign: "left",
                  padding: "20px",
                  paddingBottom:"0px",
                  fontSize: "20px",
                  color: "#282c34",
                }}
              >
                {this.state.about}
              </div>
            </div>
            <div class="column right_ltmn" style={{ width:"30%"}}>
              <ol
                class="fa-ul"
                style={{
                  textAlign: "left",
                  padding: "20px",
                  fontSize: "20px",
                  color: "#fa9e35",
                }}
              >
                <li className="geo_inf" style={{listStyle:"none",marginBottom:"10px",marginTop:"50px"}} >
                  <MdToday  style={{ color: "#525252", fontSize:"40px", marginRight:"20px"}} />
                  {this.state.geoinfo.stdate} - {this.state.geoinfo.eddate}
                </li>
                <li className="geo_inf" style={{listStyle:"none",marginBottom:"10px" }}>
                  <MdAccessTime style={{ color: "#525252", fontSize:"40px", marginRight:"20px"}} />
                  {this.state.geoinfo.sttime} - {this.state.geoinfo.edtime}
                </li>
                <li className="geo_inf" style={{listStyle:"none",marginBottom:"10px" }}>
                  <MdLocationOn style={{ color: "#525252", fontSize:"40px", marginRight:"20px"}} />
                  {this.state.geoinfo.venue}
                </li>
                <li className="geo_inf" style={{listStyle:"none",marginBottom:"10px" }}> 
                  <MdChromeReaderMode style={{ color: "#525252", fontSize:"40px", marginRight:"20px"}} />
                  {this.state.geoinfo.certificate}
                </li>
              </ol>
            </div>
          </div>
          <div
            id="instructors"
            style={{
              padding: "20px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#282c34",
            }}
          >
            Instructors
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              className="rounded-circle z-depth-2"
              alt="50x50"
              src={(this.state.instructor==null)?"https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png":this.state.instructor.profile}
              style={{
                borderWidth: "1px",
                width: "80px",
                height: "80px",
                border: "1px solid #ffa600",
                padding: "2px",
                marginLeft: "20px",
              }}
              data-holder-rendered="true"
            />
            <div>
              <a
                onClick={()=>{
                    this.props.history.push({pathname: '/lecturer', state: { detail: this.state.instructor }});
                    window.scrollTo(0, 0);
                  }
                }
                style={{
                  paddingLeft: "20px",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#525252",
                  cursor: "pointer",
                }}
              >
                {(this.state.instructor==null)?"--:--":this.state.instructor.name}
              </a>
              <div
                style={{
                  paddingLeft: "20px",
                  fontSize: "15px",
                  color: "#282c34",
                }}
              >
                {(this.state.instructor==null)?"--:--":this.state.instructor.degree}
              </div>
            </div>
          </div>
          <div
            id="syllabus"
            style={{
              padding: "20px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#282c34",
            }}
          >
            Syllabus
          </div>
          {this.state.syllabus.map((line) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "5px",
              }}
            >
              <img
                src={point}
                style={{ height: "25px", paddingLeft: "40px" }}
                alt=""
              />
              <div style={{ paddingLeft: "20px", fontSize: "20px" }}>{line}</div>
            </div>
          ))}
          <div
            id="requirements"
            style={{
              padding: "20px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#282c34",
            }}
          >
            Requirements
          </div>
          <div
            style={{
              paddingLeft: "40px",
              fontSize: "20px",
              color: "#282c34",
            }}
          >
            Department : {this.state.requirements[0]}
          </div>
          <div
            style={{
              paddingLeft: "40px",
              fontSize: "20px",
              color: "#282c34",
            }}
          >
            Year : {this.state.requirements[1]}
          </div>
          <div
            style={{
              paddingLeft: "40px",
              fontSize: "20px",
              color: "#282c34",
            }}
          >
            Topics : {this.state.requirements[2]}
          </div>
          <div
            id="registration"
            style={{
              padding: "20px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#282c34",
            }}
          >
            Registration
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  fontSize: "20px",
                  color: "#282c34",
                }}
              >
                {!(this.state.registered.includes(localStorage.getItem("userID")))?"Before registering do check the fee details below. You would be required to pay the fee amount after registration to complate the registration process."
                :"To complete the registration process do the pay the fees amount to the concerned department head. If already paid can ignore the message! \n Remember, Cancellation of registration cannot be reversed"}
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  width: "20%",
                  padding: "10px",
                  color: "white",
                  display: "inline-block",
                  marginLeft: "40px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  backgroundImage: `url("https://t3.ftcdn.net/jpg/03/38/48/62/360_F_338486227_qQitUvh3nILqYiuQOUGxdfindoNMbtpH.jpg")`,
                }}
              >
                Fee: ₹ {this.state.fee}
              </div>
            </div>
            <div
              style={{
                padding: "3px",
                border: "3px solid green",
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: "0 0 10px black",
                margin: "20px",
                marginTop: "0px",
              }}
            >
              <div
                onClick={!(this.state.registered.includes(localStorage.getItem("userID")))?this.register.bind(this):this.cancel.bind(this)}
                style={{
                  display: "flex",
                  height: "200px",
                  width: "150px",
                  color: "white",
                  backgroundImage: !(this.state.registered.includes(localStorage.getItem("userID")))?`url("https://img.freepik.com/free-vector/black-dark-3d-low-poly-geometric-background_79145-393.jpg?size=626&ext=jpg")`:`url("https://png.pngtree.com/thumb_back/fw800/background/20190906/pngtree-red-polygonal-background-image_314107.jpg")`,
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor:"pointer"
                }}
              >
                {!(this.state.registered.includes(localStorage.getItem("userID")))?
                "Click here to Register"
                :
                "Click here to Cancel"
                }
              </div>
            </div>
          </div>
          </div>
          }
      </div>
    );
  }
}

export default withRouter(Lecture_main);
//backgroundColor:"#009929"
