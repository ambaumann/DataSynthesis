// var dateFunctions = require('./dateTimeFunctions.js');
// var dataOutputFunctions = require('./dataOutputFunctions.js');
// var randomFunctions = require('./randomFunctions.js');
// var sqlDBRecordCountFunction = require('./dbQueries.js');
// var awaitQueryFunctions = require('./dbQueriesReferenceData.js');
// const { eventNames } = require('../dbConnections/mysqlConnect.js');
const dotenv = require('dotenv');
dotenv.config({path: `../.env`})
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const hl7_version= "2.5.1"
const HL7Common = {
    fieldSeperator : "|",
    segmentSeperator : "\n",
    subcomponentSeperator : "^",
    fieldRepeat: "~"
}

const hl7_messages = [];
module.exports = {

    /*
     *   Params:
     *   HL7 Version
     *   MessageType - ADT
     *   TriggerEvent - A01, A02, A03, A04, A08
     *   messagetype is combination of MessageType^TriggerEvent
     *   SendingApp
     *   SendingFacility
     *   USState
     */

    /*
     *  Generate an HLy v2x HL7 ecord
     */
    generateHL7_Record(rows, doc_type, trigger_event, count, state, sending_app, sending_fac){
        //Create different templates for different types
        const relationships = ["Mother", "Father", "Sister", "Brother", "Aunt", "Uncle"];
        const random_number = Math.floor(Math.random() * (count - 0) + 0);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const random_letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        console.log("generate rows"+rows)
        if(hl7_version == "2.5.1"){
            console.log("looping rows")
            console.log(rows)
            rows.forEach(row=>{
            const sending_application = sending_app
            const sending_facility = sending_fac
            const receiving_application = sending_app
            const receiving_facility=sending_fac
            const timestamp = moment().format("yyyyMMDDHHMMSS");
            const security = ""
            const messagetype = `${doc_type}^${trigger_event}`
            const messagecontrolid = `${sending_application}-${sending_facility}-${messagetype}${uuidv4()}`
            const environment = "P"
            const version = "2.5.1"
            const eventtype = messagetype.split("^")[1]
            const set_id = "1"
            //DATAGENERATED_ACCOUNTNUMBERS 
            const patientid =row.AccountNumberValue
            //DATAGENERATED_ACCOUNTNUMBERS
            const patientid_list = row.AccountNumberValue
            //DATAEXISTING_NAMEFIRST => RANDOMIZED
            const firstname = row.FirstName
            //RANDOMIZE LETTER
            const middlename = random_letter
            //DATAEXISTING_NAMELAST => RANDOMIZED
            const lastname = row.LastName
            //CONCAT ALL THREE
            const fullname = `${firstname}^${middlename}^${lastname}^^^`
            //CONCAT DATAEXISTING_ADDRESS AND ZIPCODEUS
            const fullpatientaddress = `${row.AddressStreet}^^${row.City}^${row.State}^${row.ZipCode}^USA^^^${row.State}`
            //LEAVE BLANK
            const allergy_type_code = ""
            //LEAVE AS IS
            const allergy_code_mnemonic = "F001900388^No Known Allergies^^^allergy.id"
            //ASSUME SAME ADDRESS AS PATIENT
            const g_address = fullpatientaddress
            //RANDOMIZE
            const alternative_patientid = Math.floor(1000 + Math.random() * 9000)
            //DATAEXISTING_LASTNNAME =>RANDOMIZE
            const mothers_maiden_name = rows[random_number].LastName
            //DATAGENERETED_DATEOFBIRTH AGE >10
            const date = new Date(row.DateOfBirth)
            const dt_birth = moment(date).format("yyyyMMDD")
            //DATAEXISTING_FIRSTNAME/LASTNAME
            const gender = row.Gender
            //DATAEXISTING_REF
            const ethnic_group = "B"
            //HARDCODE TO USA
            const country_code = "USA"
            //CONCAT DATAEXISTING_AREACODE + DATAEXISTING_PHONENUMBER =>RANDOMIZE
            const home_phone = `${row.AreaCodeValue}-${row.PhoneNumberValue}`
            //CONCAT DATAEXISTING_AREACODE + DATAEXISTING_PHONENUMBER =>RANDOMIZE
            const business_phone = `${row.AreaCodeValue}-${rows[random_number].PhoneNumberValue}`
            //REFDATA_CODETERMS_APPLICATION
            const primary_lang ="EN"
            //REFDATA
            const marital_status = "SA"
            //REFDATA
            const religion = "NA"
            //DATAGENERATED_ACCOUNTNUMBERS
            const patient_acct_num = row.AccountNumberValue
            //DATAGENERATED_SOCIALSECURITYNUMBER
            const ssn = row.SocialSecurityNumberValue
            //DATAGENERATED_DRIVERLICENSES
            const drivers_license_num = row.DLN
            //REFDATA
            const patient_class = "patient"
            //REFDATA
            const location = "Location"
            //REFDATA
            const admission_type = "IN"
            //BLANK
            const preadmit_num = ""
            //BLANK 
            const prior_patient_loc = ""
            //1434567516^LASTNAME^PHYSICIANFIRST
            const ID6 = Math.floor(100000 + Math.random() * 900000)
            const attending_physician =`{${ID6}^${rows[random_number].LastName}^${rows[random_number].FirstName}}`
            const referring_physcian = `{${ID6}^${rows[random_number].LastName}^${rows[random_number].FirstName}}`
            const consulting_physcian = `{${ID6}^${rows[random_number].LastName}^${rows[random_number].FirstName}}`
            const admitting_doctor = `{${ID6}^${rows[random_number].LastName}^${rows[random_number].FirstName}}`
            //REFDATA
            const hospital_service = "SURG"
            //REFDATA
            const admit_source = "AMB"
            //REFDATA
            const ambulatory_status = "W"
            const vip_indicator = "N"
            //REFDATA
            const patient_type = "IN"
            const visit_number=""
            //REFDATA
            const financial_class="INF"
            //IF ER NO ADMIT DATE OTHERWISE DO +1 ADMIT DATE
            const admit_date ="20210630"
            const discharge_date ="20120630"
            //REFDATA
            const severity = "bad"
            const reaction = "appropriate"
            //TODAYDATE
            const id_date = moment().format("yyyyMMDD")
            //REFDATA
            const accident_code = ""
            //REFDATA
            const coding_method = ""
            //REFDATA
            const dg_code = ""
            //REFDATA
            const description = ""
            //DATE
            const diagnosis_timestamp = timestamp
            //REFDATA
            const diagnosis_type = ""
            //ALL REFDATA FROM OTHER FIELDS ABOVE
            const g_number = patient_acct_num
            const g_name = fullname
            const g_dob = dt_birth
            const g_gender = gender
            const g_type = ""
            const g_relationship = relationships[Math.floor(Math.random()*relationships.length)]
            const g_emp_name = ""
            const g_emp_address = ""
            const g_emp_phn = ""
            //REFDATA
            const hp_id = ""
            //REFDATA ALL BELOW
            const insurance_comp_id = "Dr Bob Loblaw"
            const ins_comp_name = "Dr Bob Loblaw"
            const ins_comp_addr = ""
            const ins_comp_contact = "Dr Bob Loblaw"
            const ins_comp_phn = ""
            const plan_effective_date = ""
            const auth_info = ""
            const insurer_name = ""
            const patient_relationship = "Dr Bob Loblaw"
            const insured_dob = ""
            hl7_messages.push(
`MSH|^~\\&|${sending_application}|${sending_facility}|${receiving_application}|${receiving_facility}|${timestamp}|${security}|${messagetype}|${messagecontrolid}|${environment}|${version}
EVN|${eventtype}|${timestamp}||||
PID|${set_id}|${patientid}|${patientid_list}|${alternative_patientid}|${fullname}|${mothers_maiden_name}|${dt_birth}|${gender}||${ethnic_group}|${fullpatientaddress}|${country_code}|${home_phone}|${business_phone}|${primary_lang}|${marital_status}|${religion}|${patient_acct_num}|${ssn}|${drivers_license_num}
PV1|${set_id}|${patient_class}|${location}|${admission_type}|${preadmit_num}|${prior_patient_loc}|${attending_physician}|${referring_physcian}|${consulting_physcian}|${hospital_service}||||${admit_source}|${ambulatory_status}|${vip_indicator}|${admitting_doctor}|${patient_type}|${visit_number}|${financial_class}||||||||||||||||||||||||${admit_date}|${discharge_date}||||||||
AL1|${set_id}|${allergy_type_code}|${allergy_code_mnemonic}|${severity}|${reaction}|${id_date}
ACC|${timestamp}|${accident_code}
DG1|${set_id}|${coding_method}|${dg_code}|${description}|${diagnosis_timestamp}|${diagnosis_type}||||||||||||N
GT1|${set_id}|${g_number}|${g_name}||${g_address}|${home_phone}||${g_dob}|${g_gender}|${g_type}|${g_relationship}|${ssn}||||${g_emp_name}|${g_emp_address}|${g_emp_phn}||ST|
IN1|${set_id}|${hp_id}|${insurance_comp_id}|${ins_comp_name}|${ins_comp_addr}|${ins_comp_contact}|${ins_comp_phn}|||||${plan_effective_date}||${auth_info}||${insurer_name}|${patient_relationship}|${insured_dob}||||||||||||||||||||||||||`.replace(/[\n\r]/g, '\r')
            )
        })
        return hl7_messages
        }

    },
    handleDocType(doctype,version,count){
        if (doctype == "ADT") {
            return this.generateHL7_Record("ADT")
        }
    }

}
