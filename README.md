# Multilingual Chat App with PubNub ChatEngine and AWS Translate

Follow this README to build your multilingual chat app with the help of PubNub ChatEngine. ChatEngine is a framework for building chat apps for any chat realted use case. It is feature rich, extensible and designed to work at scale, thanks to the globally available PubNub Data Stream Network. Check out the complete feature list of PubNub ChatEngine.

This repository contains an example chat app built with ChatEngine, that has language translation capabilities. AWS Translate service powers the language translation feature and you will see how easy and quickly you can integrate AWS Translate API in this chat app. You can learn more about AWS Translate in the official AWS documentation.  

The source code for this chat app is in Javascript. The UI frontend uses the standard javascript libraries like JQuery, so some level of familiarity with JQuery and standard Javascript language is expected. 

For reference, here is the complete documentation of PubNub Chatengine. The AWS Translate documentation can be accessed in this link.  

Once built, the app can establish a chat session between two users. It will have an the fly language selection dropdown through which the users can choose the language in which they want to receive the messages in. Take a look at this screenshot to get a feel for the chat app.

<screenshot>
  

You can follow the sections below to build this example chat app in no time. But before you begin, you must have an account in PubNub and AWS. 

1. Create your PubNub account

2. Create your free AWS account 

  


## [Set Up Basic ChatEngine](#set-up-basic-chatengine)

First you need to setup the ChatEngine enabled PubNub app in your account. 

### Step 1 : Login to your [PubNub Ap Console](https://admin.pubnub.com)


### Step 2 : Activate ChatEngine in your PubNub account

Follow these steps in [ChatEngine QuickStart Tutorial](https://www.pubnub.com/docs/tutorials/chatengine#step-one-pubnub-keys) to setup your chat app instance. Check the first step "Configure Your Account" in quickstart tutorial and click on the setup button.

### Step 3 : Wait for a few seconds. Once done, you will get a new PubNub app created within your account with a new set of publish and subscribe keys. 

screenshot

### Step 4 : Check the a new app is created in your PubNub admin dashboard.

screenshot

Now your app infrastucture is created. You may choose to follow the remaining steps in quick start to build the barebones chat app. 

For enabling multilingual chat feature, head over to the next section. 



## [Set Up AWS Translate Service](#set-up-aws-translate-service)

Follow these steps to setup your own AWS Translate service


## [Set Up PubNub Function for Translation](#set-up-pubnub-function-for-translation)

Follow these steps to setup Translation feature

## [App Deployment and Testing](#app-deployment-and-testing)

Follow these steps to setup Translation feature
