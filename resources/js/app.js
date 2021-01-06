import axios from 'axios'
import Noty from 'noty' 
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelectorAll('#cartCounter')

// let prodimg = document.querySelector("#prodimg");

// Product detail page
// prodimg.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         let prod = JSON.parse(btn.dataset.prod)
        
//         console.log(prod);
// })

// prodimg.addEventListener('click', (e) => {
//     let prod = JSON.parse(prodimg.dataset.prod)
//     console.log(prod);
// });

function updateCart(pizza) {
    axios.post('/update-cart',pizza).then(res => {
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
            layout: "topLeft"
        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
            layout: "topLeft"
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(e)
    })
})

// Remove alert message after 2 seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


// Changing order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order =  hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updateAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')                
            }
        }
    })
}

updateStatus(order);

// Socket
let socket = io()

// Join
if (order) {
    socket.emit('join', `order_${order._id}`)    
}

let adminAreaPath = window.location.pathname
if (adminAreaPath.includes('admin')) {
    initAdmin(socket) // All the code of admin.js will be included here
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updateAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
        layout: "topLeft"
    }).show();
})