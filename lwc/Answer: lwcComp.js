// lwcComp.js
import { LightningElement, track, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import CLOSE_DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import OWNER_FIELD from '@salesforce/schema/Opportunity.OwnerId';

export default class LwcComp extends LightningElement {
    
    @track opportunities;
    @track opportunityName;
    @track stageName;
    @track amount;
    @track closeDate;
    @track ownerName;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, STAGE_FIELD, AMOUNT_FIELD, CLOSE_DATE_FIELD, OWNER_FIELD]})
    wireOpportunity({ error, data }) {
        if (data) {
            this.opportunityName = getFieldValue(data, NAME_FIELD);
            this.stageName = getFieldValue(data, STAGE_FIELD);
            this.amount = getFieldValue(data, AMOUNT_FIELD);
            this.closeDate = getFieldValue(data, CLOSE_DATE_FIELD);
            this.ownerName = getFieldValue(data, OWNER_FIELD);
        } else if (error) {
            // handle error
        }
    }

    connectedCallback() {
        this.fetchOpenOpportunities();
    }

    fetchOpenOpportunities() {
        const fields = [
            `${OPPORTUNITY_OBJECT.fields.Name}.value`,
            `${OPPORTUNITY_OBJECT.fields.StageName}.value`,
            `${OPPORTUNITY_OBJECT.fields.Amount}.value`,
            `${OPPORTUNITY_OBJECT.fields.CloseDate}.value`,
            `${OPPORTUNITY_OBJECT.fields.OwnerId}.value`
        ];
        const openOpportunities = OPPORTUNITY_OBJECT.objectApiName;
        const query = `SELECT ${fields.join(',')} FROM ${openOpportunities} WHERE IsClosed = false`;
        // Call Apex controller to get the open opportunities
        // and set the data on the opportunities property
    }

    // Handle search feature
    handleSearch(event) {
        // Get the search string
        const searchString = event.target.value;
        // Filter the opportunities
        // and set the data on the opportunities property
    }

    // Handle sorting feature
    handleSort(event) {
        // Get the field and direction to sort
        const fieldName = event.detail.fieldName;
        const sortDirection = event.detail.sortDirection;
        // Sort the opportunities
        // and set the data on the opportunities property
    }

    // Handle pagination feature
    handlePageChange(event) {
        // Get the page and page size
        const page = event.detail.page;
        const pageSize = event.detail.pageSize;
        // Get the paginated opportunities
        // and set the data on the opportunities property
    }
}