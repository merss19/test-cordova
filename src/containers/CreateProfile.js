import React from 'react'
import { connect } from 'react-redux'
import { createProfile } from '../actions'
import $ from 'jquery';

let CreateProfile = ({ dispatch }) => {
  let firstName;
  let lastName;
  let gender;
  let country;
  let city;
  let phone;
  let email;
  let password;
  let birthday;
  let timezone;
  let height;
  let weight;
  let squatsCount;
  let role;
  let program;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        // if (!input.value.trim()) {
        //   return
        // }

        let data = {
          'firstName': firstName.value, //'Art',
          'lastName': lastName.value, //'Sh',
          'gender': gender.value, //'male',
          'country': country.value, //'Russia',
          'city': city.value, //'Vladimir',
          'phone': phone.value, //'9051112223',
          'email': email.value, //'test2@mail.ru',
          'password': password.value, //'111111',
          'birthday': '2016-11-02T09:47:18.238Z',
          'timezone': 'string',
          'height': height.value, //183,
          'weight': weight.value, //67,
          'squatsCount': squatsCount.value, //100,
          'role': 3,
          'program': 1,
        };

        console.log(data);

        $.ajax({
          url: 'http://sport.muhanov.net/api/user/user-create',
          type: 'POST',
          dataType: 'json',
          data: data,
          success: function(user) {
            console.log('<=========|===0')
            console.log(user)
            dispatch(createProfile(user.data.authToken))
          }.bind(this)
        });
      }}>
      <div>Имя</div>
        <input ref={node => {
          firstName = node
        }} />
        <br/>
      <div>Фамилия</div>
        <input ref={node => {
          lastName = node
        }} />
        <br/>
      <div>Пол</div>
        <input ref={node => {
          gender = node
        }} />
        <br/>
      <div>Страна</div>
        <input ref={node => {
          country = node
        }} />
        <br/>
      <div>Город</div>
        <input ref={node => {
          city = node
        }} />
        <br/>
      <div>Телефон</div>
        <input ref={node => {
          phone = node
        }} />
        <br/>
      <div>Email</div>
        <input ref={node => {
          email = node
        }} />
        <br/>
      <div>Пароль</div>
        <input ref={node => {
          password = node
        }} />
        <br/>
      <div>День рождения</div>
        <input ref={node => {
          birthday = node
        }} />
        <br/>
      <div>Рост</div>
        <input ref={node => {
          height = node
        }} />
        <br/>
      <div>Вес</div>
        <input ref={node => {
          weight = node
        }} />
        <br/>
      <div>Количество приседаний</div>
        <input ref={node => {
          squatsCount = node
        }} />
        <br/>

        <button type="submit">
          Сохранить
        </button>
      </form>
    </div>
  )
}
CreateProfile = connect()(CreateProfile)

export default CreateProfile
