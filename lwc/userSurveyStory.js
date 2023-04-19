// Generate js file for lwc component for User survey story
import { LightningElement, api } from 'lwc';

export default class UserSurveyStory extends LightningElement {
    // api for specialty, preferences, and location of user
    @api specialty;
    @api preferences;
    @api location;

    // check if user is logged in
    isLoggedIn = false;

    // surveys list
    surveys = [
        {
            id: '1',
            status: 'Active',
            completed: false,
            cancelled: false
        },
        {
            id: '2',
            status: 'Active',
            completed: false,
            cancelled: false
        },
        {
            id: '3',
            status: 'Active',
            completed: false,
            cancelled: false
        }
    ];

    // function to match surveys to the user based on their criteria
    matchSurveys() {
        let surveysList = [];
        for (let survey of this.surveys) {
            if (
                survey.status === 'Active' &&
                !survey.completed &&
                !survey.cancelled
            ) {
                if (
                    this.specialty === survey.specialty &&
                    this.preferences === survey.preferences &&
                    this.location === survey.location
                ) {
                    surveysList.push(survey);
                }
            }
        }
        return surveysList;
    }

    // function to skip survey
    skipSurvey(id) {
        for (let survey of this.surveys) {
            if (survey.id === id) {
                survey.completed = true;
            }
        }
    }

    // function to download survey reports in a downloadable format
    downloadSurveyReports() {
        let csvData = [];
        let headerRow = [];
        headerRow.push('Id');
        headerRow.push('Status');
        headerRow.push('Completed');
        headerRow.push('Cancelled');
        csvData.push(headerRow);
        for (let survey of this.surveys) {
            let row = [];
            row.push(survey.id);
            row.push(survey.status);
            row.push(survey.completed);
            row.push(survey.cancelled);
            csvData.push(row);
        }
        // generate csv file
        let csvFile = '';
        csvData.forEach(function(row) {
            csvFile += row.join(',');
            csvFile += '\n';
        });
        // download csv file
        let downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
        downloadLink.target = '_blank';
        downloadLink.download = 'survey-reports.csv';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}