//LWC component
import { LightningElement, track, api } from 'lwc';
import { getOpenOpportunities } from '@salesforce/apex/OpportunityController.getOpenOpportunities';

export default class ViewOpenOpportunities extends LightningElement {
    @track error;
    @track searchKey = '';
    @track opportunities;
    @track columns = [
        { label: 'Opportunity Name', fieldName: 'Name' },
        { label: 'Opportunity Owner', fieldName: 'Owner.Name' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Closing Date', fieldName: 'CloseDate', type: 'date' }
    ];
    @track page = 1;
    @track pageSize = 10;
    @track totalRecords;
    
    connectedCallback() {
        this.getOpportunities();
    }

    handleKeyChange(event) {
        this.searchKey = event.target.value;
        this.page = 1;
        this.getOpportunities();
    }

    getOpportunities() {
        getOpenOpportunities({
            searchKey: this.searchKey,
            pageSize: this.pageSize,
            pageNumber: this.page
        })
            .then(result => {
                this.opportunities = result.opportunities;
                this.totalRecords = result.totalRecords;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handleSort(event) {
        this.getOpportunities();
    }

    handlePrevious(event) {
        this.page = this.page - 1;
        this.getOpportunities();
    }

    handleNext(event) {
        this.page = this.page + 1;
        this.getOpportunities();
    }
}