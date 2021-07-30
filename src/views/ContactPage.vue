<template>
    <div class="nav-top-margine">
        <main id="mainFull">
            <h2>Contact us</h2>
            <div>
                <h3>Contact <i class="fa fa-id-card" ></i></h3>
                <p><i class="fa fa-phone"></i>  +381 63 123 4567
                </p>
                <p><i class="fa fa-envelope"></i> cookbook@mail.com
                </p>
                <p><i class="fa fa-home"></i> Unknown Heroes NN, Belgrade, Serbia
                </p>
            </div>
        </main>
        <div>
            <iframe id="map" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Belgrade,%20Serbia+(We%20are%20CATS)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            emailValue: "",
            msgValue: "",
            disabledMsg: false
        }
    },
    methods:{
    }
}
</script>

<style scoped>
    .nav-top-margine{
        margin: 150px auto 0;
        background: #fff;
        background-image: linear-gradient(to right, #fff, #dcfaec);
    }
    h2{
        font-weight: 800;
        font-size: 2em;
    }
    #map{
        width: 100%;
        height: 500px;
        border-radius: 15px;
        margin: 50px 0 5px;
    }
    #mainFull{
        width: 80%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
    }
    #mainFull > div{
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .fa{
        font-size: 2.5em;
        font-weight: 800;
        margin: 0 15px 0 0;
    }
    @media screen and (max-width:768px) {
        #mainFull{
            width: 90%;
            flex-direction: column;
            align-items: center;
            justify-content: baseline;
        }
        #map{
            width: 90%;
        }
    }
</style>