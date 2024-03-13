//import React from "react";
//import "./Report.css";
//import { Heading } from "@chakra-ui/react";
//import { FaTimesCircle } from "react-icons/fa";
//import axios from "axios"; // Import Axios
//
//export default function Report(props) {
//  const isHealthy = props.disease_name.toLowerCase().includes("healthy");
//  const closeReport = () => {
//    document.querySelector(".disease_report").classList.add("hidden");
//    if (props.set_disease_name) {
//      props.set_disease_name("");
//    }
//  };
//
//  const openDiseaseInformation = async (diseaseName) => {
//    try {
//      const response = await axios.get(`http://127.0.0.1:5000/disease/${encodeURIComponent(diseaseName)}`);
//      if (response.status === 200) {
//        const data = response.data;
//        if (data) {
//          // Assuming data contains disease information and effects
//          // You can customize this part based on your backend response
//          alert(`Disease Name: ${data.name}\nSymptoms: ${data.symptoms}\nCauses: ${data.causes}`);
//        } else {
//          alert("Disease information not found");
//        }
//      } else {
//        throw new Error("Network response was not ok");
//      }
//    } catch (error) {
//      console.error("Error:", error);
//    }
//  };
//
//  return (
//    <div className="disease_report hidden">
//      <div className="report_content">
//        <FaTimesCircle className="closeReportButton" onClick={closeReport} />
//        <div className="report_header">
//          <Heading as="h2" size="2xl">
//            Plant Name:{" "}
//            {props.disease_name && props.disease_name.split("__")[0]}
//          </Heading>
//          <Heading as="h2" size="2xl" marginTop="10">
//            Disease Name:{" "}
//            {props.disease_name &&
//              props.disease_name.split("__")[1].replace(/_/g, " ")}
//          </Heading>
//        </div>
//        <div className="disease_image">
//          <img
//            src={props.image && URL.createObjectURL(props.image)}
//            alt="plant disease"
//          />
//        </div>
//        <div className="show_more">
//          <button
//            className="checkBtn"
//            onClick={() => {
//              openDiseaseInformation(props.disease_name);
//            }}
//          >
//            {isHealthy ? "This plant is healthy" : "Show Informations"}
//          </button>
//        </div>
//      </div>
//    </div>
//  );
//}
import React from "react";
import "./Report.css";
import { Heading } from "@chakra-ui/react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";

export default function Report(props) {
  const isHealthy = props.disease_name.toLowerCase().includes("healthy");
  const closeReport = () => {
    document.querySelector(".disease_report").classList.add("hidden");
    if (props.set_disease_name) {
      props.set_disease_name("");
    }
  };

  const openDiseaseInformation = async (diseaseName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/disease/${encodeURIComponent(diseaseName)}`);
      if (response.status === 200) {
        const { disease, effects } = response.data;
        if (disease) {
          // Extracting specific attributes from disease
          const [id, name, symptoms, causes] = disease;
          // Extracting specific attribute from effects
          const [effect] = effects;
          const [effectId, diseaseId, description] = effect;
          // Displaying the information
          alert(`Disease Name: ${name}\nSymptoms: ${symptoms}\nCauses: ${causes}\nEffects: ${description}`);
        } else {
          alert("Disease not found");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="disease_report hidden">
      <div className="report_content">
        <FaTimesCircle className="closeReportButton" onClick={closeReport} />
        <div className="report_header">
          <Heading as="h2" size="2xl">
            Plant Name:{" "}
            {props.disease_name && props.disease_name.split("__")[0]}
          </Heading>
          <Heading as="h2" size="2xl" marginTop="10">
            Disease Name:{" "}
            {props.disease_name &&
              props.disease_name.split("__")[1].replace(/_/g, " ")}
          </Heading>
        </div>
        <div className="disease_image">
          <img
            src={props.image && URL.createObjectURL(props.image)}
            alt="plant disease"
          />
        </div>
        <div className="show_more">
          <button
            className="checkBtn"
            onClick={() => {
              openDiseaseInformation(props.disease_name);
            }}
          >
            {isHealthy ? "This plant is healthy" : "Show Information"}
          </button>
        </div>
      </div>
    </div>
  );
}
