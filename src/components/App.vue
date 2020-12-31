<template>
  <div class="h-100">
    <b-container fluid="true" class="h-100 bv-example-row bv-example-row-flex-cols">
      <b-row align-v="center" class="h-100 p-0 m-0">
        <b-col cols="1" md="3"></b-col>
        <b-col cols="10" md="6">
          <b-card
              title="Find out your favourite programming language"
              img-src="https://herc.me/wp-content/uploads/2020/12/programming_languages.png"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2 v-100 h-100"
          >
            <b-card-text>
              Fill the form below so we can take a guess at which is your favourite programming language. First select the provider, currently only GitHub is supported, then enter your username.
              <br/>
              When you press "Go" we will read your 100 most recent public repositories and calculate what your favourite programming language might be.
              <br/>
              <b-input-group class="mt-3 mb-5">
                <b-input-group-prepend>
                  <b-select v-model="provider">
                    <b-select-option value="github">GitHub</b-select-option>
                    <b-select-option value="bitbucket" disabled>BitBucket</b-select-option>
                    <b-select-option value="gitlab" disabled>GitLab</b-select-option>
                  </b-select>
                </b-input-group-prepend>
                <b-form-input type="text" v-model="username"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success" v-on:click="getFavouriteProgrammingLanguage">Go</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col cols="1" md="3"></b-col>
      </b-row>
    </b-container>
    <b-toast variant="danger" id="error-toast" title="An error has occurred!" solid no-auto-hide>
      {{error}}
    </b-toast>
  </div>
</template>

<script>
  import apiService from '../APIService';

  export default {
    name: "App",
    data: function() {
      return {
        username: '',
        provider: 'github',
        error: '',
        response: ''
      }
    },
    methods: {
      showError: function(error) {
        this.error = error;
        this.$bvToast.show('error-toast')
      },
      validateData: function() {
        if (this.username === '') {
          this.showError('Empty username provided, please fill in a username.');
          return false;
        }

        if (this.provider === '') {
          this.showError('Empty provider provided, please select a provider.');
          return false;
        }

        if (this.provider !== 'github') {
          this.showError('Currently only GitHub is supported as a provider.');
          return false;
        }

        return true;
      },
      getFavouriteProgrammingLanguage: function() {
        if (!this.validateData()) return;

        apiService.getFavouriteProgrammingLanguage(this.provider, this.username).then((response) => {
          console.log(response);
        }).catch((error) => {
          this.showError('Something went wrong! Please try again later.')
        });
      }
    }
  }
</script>