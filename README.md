# Student Support System

#### Discover your career with our career counsellors

<!-- image -->
![Website Image](/images/Home_page.jpg)
*Fig. 1*: *Career Counselling website with Chatbot*.
 <!-- change image with chatbot -->

## Snapshots of working ChatBot Application

Here is the glimpse of how the student can chat with *Cary*, the Assistant.

![Website Image](/images/chat1.jpg)
![Website Image](/images/chat2.jpg)

*Figure*: *Querying information about Courses and Jobs*.

![Website Image](/images/chat3.jpg)
![Website Image](/images/chat4.jpg)

*Figure*: *Querying information about Colleges and IIT*.

![Website Image](/images/chat5.jpg)

*Figure*: *Querying information related to preparations*.

![Website Image](/images/chat6.jpg)
![Website Image](/images/chat7.jpg)

*Figure*: *Fixing an Appointment with the counsellor*.

![Website Image](/images/confirmation.jpg)

*Figure*: *Confirmation mail for Appointment*.

## Introduction

The *Career Counselling* is a website resource for students that can help choose them their desired stream after 10th and 12th. It contains a lot of information that will guide them how they can achieve their dreams by helping them choose right stream after 10th class. 

Students can chat with our online assistant 'Cary' using a chatbot just by saying 'Hi' and she will help you with your questions. Students can also talk to our cousellors by asking Cary to fix their meeting with our counsellors and you will get confirmation on your mails.


## Technologies and Platforms

* Node.js
* JavaScript
* [Dialogflow](https://dialogflow.cloud.google.com/) (ML)
* [Firebase](https://console.firebase.google.com/u/0/) (Database)
* [Goocle Cloud Platform](https://console.cloud.google.com/)


## How to use this repository

This repository is a worked example demonstrating a chatbot application made using Dialogflow.
Follow below steps to make a working model of chatbot application.

Firstly, copy this repository to your local directory by executing:

```
git clone https://github.com/RupalJain97/Student-Support-System.git
```

### Google Cloud Platform (GCP) setup

GCP is platform that customers use projects to organize the resources they use. They use Google Cloud Identity and Access Management, also called “IAM”, to control who can do what with those resources. GCP provide several technologies to connect with.

Let's create a project on GCP on https://console.cloud.google.com/ which will generate a unique project ID that will be used everywhere in the project.

![GCP](/images/gcp.jpg)
*Fig. 1*: *Home page of the project created in GCP*.

### DialogFlow setup

GCP provides a development environment 'Dialogflow Enterprise' which is based on Google's machine learning. It is a natural language understanding platform used to design and integrate a conversational user interface into mobile apps, web applications, devices, bots and related uses.

In dialogflow, create an agent and select your google project created above. A new agent will be created, within which we can create intents and entities as per our requirement. But for this repository, we will be importing the intents and its properties. For importing, go the setting of the agent created and navigate to 'Export and Import' section. Now import a zip folder under DB -> 'Student-Support-System-Bot' from your working directory.

![Dialogflow](/images/dialogflow.jpg)
*Fig. 2*: *List of Intents added under the agent created in Dialogflow*.

### Firebase Database setup

For database, I have used Firebase, a cloud-hosted database. It is a platform developed by Google for creating mobile and web applications. It is a real-time database that allows storing a list of objects in the form of a tree. Data is stored as JSON and synchronized in realtime to every connected client.

Go to the link https://console.firebase.google.com/ and create a project to create firebase database. For adding data, you can navigate to 'Cloud Firestore' in left side menu. But here we will import the already created database.

![Firebase](/images/firebase.jpg)
*Fig. 3*: *Cloud Firestore in Firebase Database*.

To import the database, go to your GCP home page and click on 'Activate Cloud Shell' on top bar side to search button and execute following commands:

```
gcloud config set project [YOUR_PROJECT_ID]
gcloud firestore import gs://firebase_bk/2020-11-28T21:13:05_22917 --async
```

Now we have the data imported in our Firebase, it will be under 'Cloud Firestore' tab in left side menu in Firebase console. This data can also be seen in GCP by navigating to 'Firestore' in database section in GCP menu.  

### Deployment

Deployment is an important part which is done in dialogflow. While creating an intent, there is a setting called fulfillment which is used to integrate your agent with your services. Integrating your service allows you to take actions based on end-user expressions and send dynamic responses back to the end-user.

Fulfillment setting is enabled in few intents such as *career*, *college*, *occupation* and *counsellor*. Now we have to add our functions in an inline editor in 'Fulfillment' tab in left panel in dialogflow. Firstly enable inline editor, then copy the code in index.js and package.js from a zip file under DB -> 'function-source' from your working directory.

![Firebase](/images/fulfillment.jpg)
*Fig. 4*: *Fulfillment in Dialogflow for Deployment*.

Once deployment is completed, a cloud function is created in firebase and your project will be ready to execute.

## Execution

For executing our code, we first need to authenticate to a Google Cloud API. For authentication, we will create a new service account by following the steps provided in the link https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account under 'Creating a service account' which will create a JSON file, and save this file to your working directory.

Use this json file to set your 'GOOGLE_APPLICATION_CREDENTIALS' environment variable by replacing [PATH_TO_YOUR_JSON_FILE] with your json file path in below command.

```
$env:GOOGLE_APPLICATION_CREDENTIALS=" [PATH_TO_YOUR_JSON_FILE] .json"
node app.js
```