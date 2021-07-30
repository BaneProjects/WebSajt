<template>
  <footer id="footer">
    <div class="wrapper">
        <div class="footer-logo logo">
            <img src="../assets/logotest1.png" alt="Cookbook logo"> 
        </div>
        <div class="footer-block">
            <h3>Cook<span>Book</span></h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laudantium consequuntur eius reiciendis modi cupiditate iure iste quos incidunt vitae amet optio itaque officia ea porro exercitationem, culpa reprehenderit velit.</p>
        </div>
        <div class="footer-block">
            <h3>Contact <i class="fa fa-id-card" ></i></h3>
            <p><i class="fa fa-phone"></i>  +381 63 123 4567
            </p>
            <p><i class="fa fa-envelope"></i> cookbook@mail.com
            </p>
            <p><i class="fa fa-home"></i> Unknown Heroes NN, Belgrade, Serbia
            </p>
        </div>
    </div>
    <div class="wrapper" id="footer-bottom">
        <p>Copyright @ CookBook</p>
        <button @click="scrollToTop()">Back to top</button>
    </div>
  </footer>
</template>

<script>
export default {
    methods:{
        scrollToTop() {
            window.scrollTo(0,0);
        }
    }
}
</script>

<style>
    #footer {
        padding: 10px 260px 5px;
        background: #0b0c10c2;
        margin: 350px auto 0;
        background: #fff;
        background-image: linear-gradient(to right, #fff, #dcfaec);
        color: #2c3e50;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
    }

    #footer .wrapper {
        display: flex;
        padding: 0 100px;
        justify-content: space-between;
        align-items: flex-start;
    }
    .footer-block {
        margin-right: 40px;
        width: 300px;
    }
    .footer-logo {
        margin: 0 auto 0 0;
    }
    .footer-logo img {
        height: 100px;
        margin-top:20px;
    }

    #footer-bottom {
        border-top:1px solid #909090;
        padding: 20px 250px;
    }
    #footer-bottom button{
        margin: 10px ;
    }

      
    @media screen and (min-width:1024px) and (max-width:1279px) {
        #footer{
            padding: 5px 0;
        }
        .footer-logo {
            margin: 0;
        }

    }
    @media screen and (min-width:768px) and (max-width:1023px) {
        #footer{
            padding: 5px 0;
            width: 90%;
        }
        #footer .wrapper{
            flex-direction: column;
            align-items: center;
        }
        .footer-logo {
            margin: 0;
        }
    }
    @media screen and (max-width:768px) {
        #footer{
            width: 400px;
            padding: 0;
        }
        #footer .wrapper {
            margin: 0 auto;
            width: 80%;
            padding: 0;
        }
        #footer .wrapper{
            flex-direction: column;
            align-items: center;
        }
        #footer .wrapper > div{
            margin: 0;
        }
        .footer-logo {
            margin: 0;
        }
    }
</style>