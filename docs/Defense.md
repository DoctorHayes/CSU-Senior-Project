[Back to Main Page](./)

Bible Verse Vista - Defense Documentation
===============
- **Name**: Bryce Furrow
- **Date**: 3/4/24
- **Majors**: Computer Science and Cybersecurity
- **Advisor**: Dr. Sean Hayes
<br/>
<!--
## Table of Contents
- [1 - Statement of Purpose](#section-1)
  - [1.1 - Problem Statement](#section-11)
- [2 - Research and Background](#section-2)
  - [2.1 - ???](#section-21)
- [3 - Project Languages, Software, and Hardware](#section-3)
- [4 - Project Requirements](#section-4)
- [5 - Project Implementation](#section-5)
  - [5.1 - Description???](#section-51)
  - [5.1 - Explanation???](#section-52)
- [6 - Test Plan](#section-6)
  - [6.1 - Introduction](#section-61)
    - [6.1.1 - Project Overview](#section-611)
    - [6.1.2 - Goals/Objectives](#section-612)
    - [6.1.3 - Constraints](#section-613)
  - [6.2 - References](#section-62)
    - [6.2.1 - Project Proposal](#section-621)
    - [6.2.2 - Project Requirements](#section-622)
  - [6.3 - Testing Strategy](#section-63)
    - [6.3.1 - Test Items](#section-631)
    - [6.3.2 - Test Features](#section-632)
    - [6.3.3 - Test Approach](#section-633)
      - [6.3.3.1 - System Test](#section-6331)
      - [6.3.3.2 - User Acceptance Test (UAT)](#section-6332)
  - [6.4 - Test Deliverables](#section-64)
    - [6.4.1 - Test Cases](#section-641)
    - [6.4.2 - Advised Changes](#section-642)
    - [6.4.3 - Test Reports](#section-643)
  - [6.5 - Test Environment](#section-65)
  - [6.6 - Testing Schedule](#section-66)
  - [6.7 - Assumptions and Dependencies](#section-67)
    - [6.2.1 - Assumptions](#section-621)
    - [6.2.2 - Dependencies](#section-622)
  - [6.8 - Approvals](#section-68)
- [7 - Test Results](#section-7)
  - [7.? - MANY POSSIBILITIES](#section-7?)
- [8 - Challenges Overcome](#section-8)
- [9 - Future Enhancements](#section-9)
- [10 - Defense Presentation Slides](#section-10)
-->

## 1 - Statement of Purpose <!--{#section-1}-->
(???)
### 1.1 - Problem Statement <!--{#section-11}-->
Today, Christians have the opportunity to deliver the Word in a more effective, convenient, and personalized way with modern technologies, such as Google Chrome extensions. However, the majority of existing Bible verse extensions often fall short of expectations due to outdated browsers, generic backgrounds, lack of Biblical versions, and lack of customization options. This ultimately results in a clunky and unsatisfactory user experience. The key solution to this issue is to provide users with greater customizability in a variety of fields. Doing this will give Christians a more satisfying and immersive experience with Scripture, resulting in better engagement and understanding overall. This project seeks to create a superior Bible verse extension for Google Chrome, allowing fellow Christians to move forward with modern opportunities to spread the Word effectively.
<br/>

## 2 - Research and Background <!--{#section-2}-->
(???)
### 2.1 - ??? <!--{#section-21}-->
(???)
<br/>

## 3 - Project Languages, Software, and Hardware <!--{#section-3}-->
Project Languages:
- HTML
- CSS
- JavaScript

Software: Google Chrome v122.0.6261.95 (latest)
<br/>
Hardware: (any computer that can run Google Chrome at v122.0.6261.95???)
<br/>

## 4 - Project Requirements <!--{#section-4}-->
(Priority Scale - 1 is the highest, 5 is the lowest.)

----

<p>
ID Number: 1
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will display a Bible verse on the new tab page. This will be implemented from the website Bible Gateway. 
</p>
<p>
Rationale:<br/>
&emsp; This is the main functionality of the extension, and it will serve the purpose of providing the user with a Bible verse.
</p>
<p>
Fit Criterion:<br/>
&emsp; A Bible verse is displayed on the new tab page - yes or no.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: N/A
</p>

----

<p>
ID Number: 2
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension's search bar will sync with their default browser. 
</p>
<p>
Rationale:<br/>
&emsp; There are Google extensions that allow for the use of a different search engine while within Google Chrome (i.e. Duckduckgo). Maintaining this user preference will increase the extension's appeal. Not providing this feature would be a downgrade in the minds of a significant number of users. 
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose their preferred browser for the search bar in an options menu.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1
</p>

----

<p>
ID Number: 3
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to choose their own background image or style. 
</p>
<p>
Rationale:<br/>
&emsp; Customization is a key aspect of the extension, and allowing users to choose their own background image or style will make the extension more personal. 
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose their own background image or style in an options menu.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1
</p>

----

<p>
ID Number: 4
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to choose the location of the verse window on the new tab page. 
</p>
<p>
Rationale:<br/>
&emsp; Customization is a key aspect of the extension, and allowing users to choose the location of the verse window will make the extension more personal.
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose the location of the verse window in an options menu. 
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 5
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to choose their preferred version of the Bible. 
</p>
<p>
Rationale:<br/>
&emsp; Customization is a key aspect of the extension, and users may have a preferred version of the Bible to read. Giving them the option to choose it will increase the extension's appeal.
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose their preferred Bible version in an options menu.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 2 
</p>

----

<p>
ID Number: 6
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will display the "Verse of the Day" from Bible Gateway by default. 
</p>
<p>
Rationale:<br/>
&emsp; Displaying the "Verse of the Day" will provide users with a daily Bible verse without requiring any action on their part. This will allow for users to reflect upon the same verses as others, read verses relevant to the Christian calendar, and generally aid those lacking motivation or technical literacy to select the verses themselves.
</p>
<p>
Fit Criterion:<br/>
&emsp; The "Verse of the Day" is displayed by default as the Bible verse on the new tab page. 
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1  
</p>

----

<p>
ID Number: 7
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to choose a random Bible verse to display on the new tab page. To clarify, this random verse would be cycled daily, not any time a new tab is opened. This selection will also be purely random, even allowing repeated verses on consecutive days. All of Scripture is God's Word.
</p>
<p>
Rationale:<br/>
&emsp; Allowing users to receive a random Bible verse will provide them with an alternative series of verses throughout their use of the extension. Some users may prefer this in reading their Scripture.
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose for a random Bible verse to display on the new tab page in an options menu. 
</p>
<p>
Priority: 3
</p>
<p>
Dependencies: 1  
</p>

----

<p>
ID Number: 8
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to choose their own custom verse to display on the new tab page. 
</p>
<p>
Rationale:<br/>
&emsp; Allowing users to choose their own custom verse will provide them with a personalized experience and may be useful for memorization or meditation and study. 
</p>
<p>
Fit Criterion:<br/>
&emsp; Users can choose their own custom verse to display on the new tab page in an options menu. This will be the primary alternate choice of Bible verse. 
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1  
</p>

----

<p>
ID Number: 9
</p>
<p>
Type: Look and Feel - Appearance
</p>
<p>
Description:<br/>
&emsp; The extension's default background on the new tab page will be minimalistic with a light or dark mode.
</p>
<p>
Rationale:<br/>
&emsp; A minimalistic background will provide a clean and unobtrusive look for the extension, while the light/dark option will accentuate that look depending on which a user prefers. In addition, allowing users to choose between the two will allow for a simple binary choice and a clean canvas for those seeking more customization.
  
   if they rate the presentation on scale of 1 to 5, with 5 as most pleasing, it is 4 or above
</p>
<p>
Fit Criterion:<br/>
&emsp; The default background will be minimalistic, and there will be an option for light or dark mode in an options menu. Whether these backgrounds are suitable will be decided by survey. It will be accepted if surveyors, on a scale of 1 to 5, rate it a 4 on average.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: N/A 
</p>

----

<p>
ID Number: 10
</p>
<p>
Type: Functional
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to easily share Bible verses via social media.
</p>
<p>
Rationale:<br/>
&emsp; Sharing Bible verses is a common practice among Christians, and social media is a popular platform for doing so.
</p>
<p>
Fit Criterion:<br/>
&emsp; The user should be able to share a Bible verse to their social media account with a few clicks.
</p>
<p>
Priority: 5
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 11
</p>
<p>
Type: Performance - Speed and Latency
</p>
<p>
Description:<br/>
&emsp; The extension will load very quickly and not slow down the user's browsing experience.
</p>
<p>
Rationale:<br/>
&emsp; Users expect extensions to load quickly and not interfere with their browsing experience. 
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension should load within 100 milliseconds (1/10 of a second) of the user opening a new tab. (This is under the assumption that the user has selected an extremely high definition background.)
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 12
</p>
<p>
Type: Usability - Ease of Use
</p>
<p>
Description:<br/>
&emsp; The extension will have clear and easy-to-understand instructions for use.
</p>
<p>
Rationale:<br/>
&emsp; Users need clear instructions to make the most of the extension's features. This especially the case for users that may not be technically literate.
</p>
<p>
Fit Criterion:<br/>
&emsp; The instructions should be concise and easy to understand, with no technical jargon or assumed knowledge.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 13
</p>
<p>
Type: Performance - Reliability and Availability
</p>
<p>
Description:<br/>
&emsp; The extension will be lightweight and not consume excessive system resources. 
</p>
<p>
Rationale:<br/>
&emsp; Users expect extensions to be lightweight and not consume too much memory or CPU resources. Google Chrome, even with a single tab open, consumes a large amount of memory. Making the extension casually useable is almost as important making it functional.
</p>
<p>
Fit Criterion:<br/>
&emsp; : The extension should consume less than 50 MB of memory and less than 0.3% of the CPU resources when in use. 
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 14
</p>
<p>
Type: Look and Feel - Style
</p>
<p>
Description:<br/>
&emsp; The extension will have a cohesive visual style across all customization options. 
</p>
<p>
Rationale:<br/>
&emsp; Consistent visual design helps create a more professional and polished user experience. 
</p>
<p>
Fit Criterion:<br/>
&emsp; Whether the basic visual design is cohesive will be decided by survey. It will be accepted if surveyors, on a scale of 1 to 5, rate it a 4 on average.
</p>
<p>
Priority: 3
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 15
</p>
<p>
Type: Look and Feel - Appearance
</p>
<p>
Description:<br/>
&emsp; The extension will provide some basic, high-quality background images for users to choose from. 
</p>
<p>
Rationale:<br/>
&emsp; The background image is a key visual element of the extension, and high-quality images can enhance the user experience. Supplying them will be helpful for those wishing to test the extension's features or are not technically literate enough to insert their own.
</p>
<p>
Fit Criterion:<br/>
&emsp; The user should be able to choose from a variety of high quality background images.
</p>
<p>
Priority: 5
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 16
</p>
<p>
Type: Performance - Robustness
</p>
<p>
Description:<br/>
&emsp; The extension will not cause any errors or crashes in the browser. 
</p>
<p>
Rationale:<br/>
&emsp; Rationale: Extension errors or crashes can disrupt both the user's Scripture and browsing experience and cause frustration.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will be tested thoroughly - at least 50 times - to ensure it does not cause any errors or crashes in the browser. 
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 17
</p>
<p>
Type: Look and Feel - Appearance 
</p>
<p>
Description:<br/>
&emsp; The extension will implement minimal menus on the new tab. Instead, the majority of menus will be present in the page of the extension itself (as seen in the top of Google Chrome, in the Extensions section).
</p>
<p>
Rationale:<br/>
&emsp; Users may find visual elements such as extensive customizing menus as distracting or unnecessary. At the same time, these menus will still remain at short reach while in the Extensions section.
</p>
<p>
Fit Criterion:<br/>
&emsp; The user menus will mostly be implemented in the extension page rather than on a new tab.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 18
</p>
<p>
Type: Look and Feel - Appearance 
</p>
<p>
Description:<br/>
&emsp; The extension will support light and dark mode for the verse window. 
</p>
<p>
Rationale:<br/>
&emsp; Allowing differing light or dark mode settings may seem strange. However, allowing the option to have it be different allows for those who may want it an improved user experience. It may help a user focus in on the verse with the contrast in color.
</p>
<p>
Fit Criterion:<br/>
&emsp; The user can set one or both the background and verse window to be light or dark mode.
</p>
<p>
Priority: 4
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 19
</p>
<p>
Type: Usability - Personalization and Internalization
</p>
<p>
Description:<br/>
&emsp; The extension will allow users to select the preferred language for the Bible version and the interface in order to accommodate non-English speakers.
</p>
<p>
Rationale:<br/>
&emsp; Allowing users that speak other languages than English to receive God’s Word is important. However, I will focus more on the functionality, customization, and usability of the extension.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will have at least five different languages available, and the language change will be seamless and immediate.
</p>
<p>
Priority: 4
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 20
</p>
<p>
Type: Usability - Learning
</p>
<p>
Description:<br/>
&emsp; The extension will have an intuitive interface that allows new users to easily understand the customization options available.
</p>
<p>
Rationale:<br/>
&emsp; Users should not need to trudge through instructions in order to use the extension's basic features. This especially the case for users that may not be technically literate.
</p>
<p>
Fit Criterion:<br/>
&emsp; At least 80% of first-time users will customize the background image and Bible version without external help.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 21
</p>
<p>
Type: Usability - Convenience
</p>
<p>
Description:<br/>
&emsp; The extension will have a simple and fast installation process that does not require excessive user input.
</p>
<p>
Rationale:<br/>
&emsp; Allowing for a smoother user experience should always be a goal. However, it should not be a goal beyond the functionality of the extension itself.
</p>
<p>
Fit Criterion:<br/>
&emsp; The installation process will take no more than two minutes and will require no more than five clicks from the user.
</p>
<p>
Priority: 3
</p>
<p>
Dependencies: N/A 
</p>

----

<p>
ID Number: 22
</p>
<p>
Type: Performance – Precision/Accuracy
</p>
<p>
Description:<br/>
&emsp; The extension will retrieve and display the selected Bible verses without errors or inaccuracies.
</p>
<p>
Rationale:<br/>
&emsp; This is a goal of the extension’s essential function. It must be fulfilled without exception.
</p>
<p>
Fit Criterion:<br/>
&emsp; All retrieved Bible verses will match the user's selected version and will be displayed without errors or typos.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 23
</p>
<p>
Type: Performance - Reliability and Availability
</p>
<p>
Description:<br/>
&emsp; The extension will be available and functional on all devices running the Google Chrome browser.
</p>
<p>
Rationale:<br/>
&emsp; Users will not all be running the same version of Google Chrome. It only makes sense to accommodate for a decent range of users.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will be tested and function correctly on all Google Chrome versions from the last three years on desktop and mobile devices.
</p>
<p>
Priority: 3
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 24
</p>
<p>
Type: Performance - Capacity
</p>
<p>
Description:<br/>
&emsp; The extension will be able to handle a large number of user-customized settings and preferences without slowing down the browser.
</p>
<p>
Rationale:<br/>
&emsp; As this extension is created for the sake of greater customization in Bible verse displays, it should be expected that some users will customize far more heavily than others. 
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will be tested with up to 50 different users with varying customizations, and the loading speed of the new tab will not exceed three seconds.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 25
</p>
<p>
Type: Performance – Scalability/Extensibility
</p>
<p>
Description:<br/>
&emsp; The extension will be designed to accommodate future updates and new features.
</p>
<p>
Rationale:<br/>
&emsp; All modern applications should expect to be updated in the future. Therefore, it should be built to do so from the beginning to allow for easier and faster updates for users.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension code will be organized and structured in a modular way that allows for easy modification and addition of new features.
</p>
<p>
Priority: 4
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 26
</p>
<p>
Type:	Performance – Longevity
</p>
<p>
Description:<br/>
&emsp; The extension will continue to function correctly and receive updates for at least two years after the initial release.
</p>
<p>
Rationale:<br/>
&emsp; All modern applications should expect to be updated in the future. It should certainly be expected that this will be the case.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will be tested with each new Google Chrome version and updated accordingly for at least two years after the initial release.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 27
</p>
<p>
Type: Performance – Maintainability and Support
</p>
<p>
Description:<br/>
&emsp; The extension will be documented and maintained to allow for quick and easy bug fixes and support.
</p>
<p>
Rationale:<br/>
&emsp; Documentation is an essential part of programming, and it allows for an easier time for everyone in almost every respect. 
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will have a clear and comprehensive documentation file.
</p>
<p>
Priority: 2
</p>
<p>
Dependencies: 1 
</p>

----

<p>
ID Number: 28
</p>
<p>
Type: Security – Access/Privacy
</p>
<p>
Description:<br/>
&emsp; The extension will not obtain any location data, nor will it obtain any data regarding webpage access or browsing.
</p>
<p>
Rationale:<br/>
&emsp; Too many applications and extensions obtain data unnecessary to its functions, often to sell information for data. Not only would doing so be unethical, it would be un-Christian.
</p>
<p>
Fit Criterion:<br/>
&emsp; The extension will have no portion of the code regarding location or the webpages visited by users.
</p>
<p>
Priority: 1
</p>
<p>
Dependencies: 1 
</p>

----
<br/>

## 5 - Project Implementation <!--{#section-5}-->
(???)
### 5.1 - Description??? <!--{#section-51}-->
(???)
### 5.1 - Implementation??? <!--{#section-52}-->
(???)
<br/>

## 6 - Test Plan <!--{#section-6}-->
### 6.1 - Introduction <!--{#section-61}-->
#### 6.1.1 - Project Overview <!--{#section-611}-->
#### 6.1.2 - Goals/Objectives <!--{#section-612}-->
#### 6.1.3 - Constraints <!--{#section-613}-->
### 6.2 - References <!--{#section-62}-->
#### 6.2.1 - Project Proposal <!--{#section-621}-->
(???)
#### 6.2.2 - Project Requirements <!--{#section-622}-->
(???)
### 6.3 - Testing Strategy <!--{#section-63}-->
#### 6.3.1 - Test Items <!--{#section-631}-->
#### 6.3.2 - Test Features <!--{#section-632}-->
#### 6.3.3 - Test Approach <!--{#section-633}-->
##### 6.3.3.1 - System Test <!--{#section-6331}-->
##### 6.3.3.2 - User Acceptance Test <!--{#section-6332}-->
### 6.4 - Test Deliverables <!--{#section-64}-->
#### 6.4.1 - Test Cases <!--{#section-641}-->
#### 6.4.2 - Advised Changes <!--{#section-642}-->
#### 6.4.3 - Test Reports <!--{#section-643}-->
### 6.5 - Test Environment <!--{#section-65}-->
### 6.6 - Testing Schedule <!--{#section-66}-->
### 6.7 - Assumptions and Dependencies <!--{#section-67}-->
#### 6.7.1 - Assumptions <!--{#section-671}-->
#### 6.7.2 - Dependencies <!--{#section-672}-->
### 6.8 - Approvals <!--{#section-68}-->
<br/>

## 7 - Test Results <!--{#section-7}-->
### 7.1 - ??? <!--{#section-7?}-->
<br/>

## 8 - Challenges Overcome <!--{#section-8}-->
<br/>

## 9 - Future Enhancements <!--{#section-9}-->
<br/>

## 10 - Defense Presentation Slides <!--{#section-10}-->
