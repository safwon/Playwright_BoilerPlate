import axios from "axios";
const fs = require("fs");
const path = require("path");
import * as dotenv from "dotenv";
var nodeoutlook = require("nodejs-nodemailer-outlook");
dotenv.config();
import ENV from "@utils/env";

const mailer = require("nodemailer");
// URL of the Teams Webhook
const TEAM_WEBHOOK_URL = ENV.TEAMS_WEBHOOK;
const SLACK_WEBHOOK_URL = ENV.SLACK_WEBHOOK;
const ENVIRONMENT = ENV.ENVIRONMENT;
const PROJECT = ENV.PROJECT;
const REPORT_URL = ENV.REPORT_LINK;
const FROM_ADDRESS_MAIL = ENV.FROM_ADDRESS_MAIL;
const FROM_ADDRESS_PASSWORD = ENV.FROM_ADDRESS_PASSWORD;
const TO_MAIL_ADDRESS = ENV.TO_MAIL_ADDRESS;



function getCurrentFormattedTime(): string {
  const now = new Date();
  return now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
  });
}
const executionTime = getCurrentFormattedTime();

async function sendReportToSlack() {
  const reportPath = path.join(__dirname, "/result.json"); // Update with the correct path
  const reportContent = fs.readFileSync(reportPath, "utf8");
  const defaultobject = JSON.parse(reportContent);
  const passedcount = Number(defaultobject.Passedcount);
  const failedcount = Number(defaultobject.Failedcount);
  const Totalcount =
    Number(defaultobject.Passedcount) + Number(defaultobject.Failedcount);
  const Passpercentage = ((passedcount / Totalcount) * 100).toFixed(2);
  const Failpercentage = ((failedcount / Totalcount) * 100).toFixed(2);

  const Textmessage =
    "Hi Team," +
    "\n Test Execution For The Project " +
    PROJECT +
    " is Conducted in " +
    ENVIRONMENT +
    " Environment and its Succesfully Completed." +
    "\n" +
    "> 🟠 Total Number of Test Cases Executed : " +
    Totalcount +
    "\n" +
    "> ✅ Total Number of test cases Passed : " +
    passedcount +
    "\n" +
    "> ❌ Total Number of test cases Failed : " +
    failedcount +
    "\n" +
    "> 🟢 Test cases Pass Percentage : " +
    Passpercentage +
    "\n" +
    "> ⛔ Test cases Fail Percentage : " +
    Failpercentage +
    "\n";
  const message = {
    text: "Playwright Test Execution Report",
    attachments: [
      {
        color: "#36a64f",
        title: PROJECT,
        text: Textmessage, // You can also send a summary or a link to the report
        // icon_emoji: ":monkey_face:"
      },
      {
        blocks: [
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: "*Environment:*\n" + ENVIRONMENT,
              },
              {
                type: "mrkdwn",
                text: `*Execution Time:*\n${executionTime}`,
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Full Report",
                  emoji: true,
                },
                value: "view_report",
                url: REPORT_URL,
                style: "primary",
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    await axios.post(SLACK_WEBHOOK_URL, message);
    console.log("Report sent to Slack");
  } catch (error) {
    console.error("Error sending report to Slack:", error);
  }
}

export async function sendReportToTeams() {
  // Read your test report file
  const reportPath = path.join(__dirname, "/result.json"); // Update with the correct path
  const reportContent = fs.readFileSync(reportPath, "utf8");
  const defaultobject = JSON.parse(reportContent);
  const passedcount = Number(defaultobject.Passedcount);
  const failedcount = Number(defaultobject.Failedcount);
  const Totalcount =
    Number(defaultobject.Passedcount) + Number(defaultobject.Failedcount);
  const Passpercentage = ((passedcount / Totalcount) * 100).toFixed(2);
  const Failpercentage = ((failedcount / Totalcount) * 100).toFixed(2);

  const Textmessage =
    "Hi Team," +
    "\n Test Execution For The Project " +
    PROJECT +
    " is Conducted in " +
    ENVIRONMENT +
    " Environment and its Succesfully Completed." +
    "\n" +
    "> ## 🟠 Total Number of Test Cases Executed : " +
    Totalcount +
    "\n" +
    "> ## ✅ Total Number of test cases Passed : " +
    passedcount +
    "\n" +
    "> ## ❌ Total Number of test cases Failed : " +
    failedcount +
    "\n" +
    "> ## 🟢 Test cases Pass Percentage : " +
    Passpercentage +
    "\n" +
    "> ## ⛔ Test cases Fail Percentage : " +
    Failpercentage +
    "\n";
  // return Textmessage;

  // Construct the message
  const message = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    summary: "Test Report",
    sections: [
      {
        activityTitle: PROJECT,
        text: Textmessage,
        // Add any relevant details here
      },
      {
        activityTitle: "Execution Time:",
        activitySubtitle: `${executionTime}`,
        activityImage: "URL of an image, if needed",
        // "markdown": true
      },
      {
        activityTitle: "Environment:",
        text: ENVIRONMENT,
      },
    ],
    potentialAction: [
      {
        "@type": "OpenUri",
        name: "View Report",
        // Assuming the report is hosted/served at a URL
        targets: [{ os: "default", uri: REPORT_URL }],
      },
    ],
  };

  // Send the message to Teams
  try {
    const response = await axios.post(TEAM_WEBHOOK_URL, message);
    console.log("Message sent to Teams:", response.data);
  } catch (error) {
    console.error("Error sending message to Teams:", error);
  }
}


async function sendReportToMail() {
  // Read your test report file
  const reportPath = path.join(__dirname, "/result.json"); // Update with the correct path
  const reportContent = fs.readFileSync(reportPath, "utf8");
  const defaultobject = JSON.parse(reportContent);
  const passedcount = Number(defaultobject.Passedcount);
  const failedcount = Number(defaultobject.Failedcount);
  const Totalcount =
    Number(defaultobject.Passedcount) + Number(defaultobject.Failedcount);
  const Passpercentage = ((passedcount / Totalcount) * 100).toFixed(2);
  const Failpercentage = ((failedcount / Totalcount) * 100).toFixed(2);


  const HTMLmessage2 = `
  <html>
  <style>
    /* Your existing styles */
    .info-item {
        margin-bottom: 10px;
    }
    .info-title {
        font-weight: bold;
        display: inline-block;
        margin-right: 5px;
        font-size: 22px; /* Increased font size */
    }
    /* Style for the rest of the text */
    .info-content {
        font-size: 20px; /* You can set a different size for the content */
    }
  </style>
  <body>
    <h3>Hi Team, <br>Test Execution for the Project ${PROJECT} is conducted in ${ENVIRONMENT} Environment and it's Successfully Completed.<br>Please find below the details for the Test Execution Status.<br></h3>
    <div class="info-item">
      <span class="info-title" style="font-weight: bold; font-size: 14px;">🔵Total Number of Test Cases Executed:</span>
      <span class="info-content" style="font-weight: bold; font-size: 14px;">${Totalcount}</span>
    </div>
    <div class="info-item">
      <span class="info-title" style="font-weight: bold; font-size: 14px;">✅Total Number of Test Cases Passed:</span>
      <span class="info-content" style="font-weight: bold; font-size: 14px;">${defaultobject.Passedcount}</span>
    </div>
    <div class="info-item">
      <span class="info-title" style="font-weight: bold; font-size: 14px;">❌Total Number of Test Cases Failed:</span>
      <span class="info-content" style="font-weight: bold; font-size: 14px;">${defaultobject.Failedcount}</span>
    </div>
    <div class="info-item">
      <span class="info-title" style="font-weight: bold; font-size: 14px;">🟢Test Cases Pass Percentage:</span>
      <span class="info-content" style="font-weight: bold; font-size: 14px;">${Passpercentage}%</span>
    </div>
    <div class="info-item">
      <span class="info-title" style="font-weight: bold; font-size: 14px;">🟠Test Cases Fail Percentage:</span>
      <span class="info-content" style="font-weight: bold; font-size: 14px;">${Failpercentage}%</span>
    </div>
    <div>
    <span class="info-title" style="font-weight: bold; font-size: 14px;">Environment:</span>
      <span class="info-content" style="font-size: 14px;">${ENVIRONMENT}</span>
    </div>
    <div>
    <span class="info-title" style="font-weight: bold; font-size: 14px;">Execution Time:</span>
      <span class="info-content" style="font-size: 14px;">${executionTime}</span>
    </div>
    <div>
      <a href="${REPORT_URL}" target="_blank" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">View HTML Report</a>
    </div>

  </body>
</html>`;


const HTMLmessage1 = `
<html>
<style>
  /* Your existing styles */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #4CAF50;
    color: white;
  }
  .pass {
    background-color: #e7f4e7; /* Light green for pass */
  }
  .fail {
    background-color: #f4e7e7; /* Light red for fail */
  }
  .info {
    background-color: #e7e7f4; /* Light blue for info */
  }
  .report-link {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
  }
</style>
<body>
  <h3>Hi Team,<br>Test Execution for the project ${PROJECT} is conducted in ${ENVIRONMENT} Environment and its successfully completed.<br>Please find below the details for the Test Execution Status.<br></h3>
  <table>
    <tr>
      <th>Test Execution Detail</th>
      <th>Value</th>
    </tr>
    <tr class="info">
      <td>Total Number of Test Cases Executed</td>
      <td>${Totalcount}</td>
    </tr>
    <tr class="pass">
      <td>Total Number of Test Cases Passed</td>
      <td>${defaultobject.Passedcount}</td>
    </tr>
    <tr class="fail">
      <td>Total Number of Test Cases Failed</td>
      <td>${defaultobject.Failedcount}</td>
    </tr>
    <tr class="pass">
      <td>Test Cases Pass Percentage</td>
      <td>${Passpercentage}%</td>
    </tr>
    <tr class="fail">
      <td>Test Cases Fail Percentage</td>
      <td>${Failpercentage}%</td>
    </tr>
    <tr class="info">
      <td>Environment</td>
      <td>${ENVIRONMENT}</td>
    </tr>
    <tr class="info">
      <td>Execution Time</td>
      <td>${executionTime}</td>
    </tr>
  </table>
  <div>
    <a href="${REPORT_URL}" target="_blank" class="report-link">View HTML Report</a>
  </div>
</body>
</html>`;


  const smtpProtocol = mailer.createTransport({
    service: "GMAIL",
    auth: {
      user: FROM_ADDRESS_MAIL,
      pass: FROM_ADDRESS_PASSWORD,
    },
  });
  var mailoption = {
    from: FROM_ADDRESS_MAIL,
    to: TO_MAIL_ADDRESS,
    subject: PROJECT,
    html: HTMLmessage2,

    onError: (e: any) => console.log(e),
    onSuccess: (i: any) => console.log(i),
  };


  return new Promise((resolve, reject) =>
    smtpProtocol.sendMail(mailoption, function (err: any, response: { message: string; }) {
      if (err) {
        console.log(err);
        reject("Promise Rejected");
      }
      console.log("Message Sent To Email With HTML File");
      smtpProtocol.close();
      resolve("Promise Resolved");
    })
  );




}







async function mailSend() {
 
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await sendReportToTeams();
  await sendReportToSlack();
  await sendReportToMail();

}

export default mailSend;
