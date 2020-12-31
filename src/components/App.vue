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
              v-if="!loading"
          >
            <b-card-text v-if="!favouriteLanguageFound">
              <p>
                Fill the form below so we can take a guess at which is your favourite programming language. First select the provider, currently only GitHub is supported, then enter your username.
              </p>
              <p>
                When you press "Calculate &rarr;" we will read your 100 most recent public repositories and calculate what your favourite programming language might be.
              </p>
              <b-input-group class="my-3">
                <b-input-group-prepend>
                  <b-select v-model="provider">
                    <b-select-option value="github">GitHub</b-select-option>
                    <b-select-option value="bitbucket" disabled>BitBucket</b-select-option>
                    <b-select-option value="gitlab" disabled>GitLab</b-select-option>
                  </b-select>
                </b-input-group-prepend>
                <b-form-input type="text" v-model="username"></b-form-input>
              </b-input-group>
              <p>
                <b-button pill size="sm" variant="outline-success" v-on:click="getFavouriteProgrammingLanguage" class="my-3 float-right">Calculate &rarr;</b-button>
              </p>
            </b-card-text>
            <b-card-text v-else>
              <p>
                We have looked through a lot of your repositories to determine that your favourite programming language is <b>{{favouriteLanguage}}</b>!
              </p>
              <p>
                <b-button pill size="sm" variant="outline-info" v-on:click="resetForm" class="my-3 float-right">Check another user &rarr;</b-button>
              </p>
            </b-card-text>
          </b-card>
          <div v-else class="text-center loading_screen">
            <b-spinner type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
          </div>
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
        favouriteLanguageFound: false,
        favouriteLanguage: '',
        loading: false
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

        this.loading = true;

        apiService.getFavouriteProgrammingLanguage(this.provider, this.username).then((response) => {
          if (response.hasOwnProperty('error')) {
            this.showError(response.error);
          } else {
            this.favouriteLanguage = response.name;
            this.favouriteLanguageFound = true;
          }
          this.loading = false;
        }).catch((error) => {
          this.showError('Something went wrong! Please try again later.')
          console.log(error.message);
          this.loading = false;
        });
      },
      resetForm: function()
      {
        this.favouriteLanguage = '';
        this.username = '';
        this.favouriteLanguageFound = false;
      }
    }
  }
</script>