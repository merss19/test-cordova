import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PromoCodeReportGrid from '../components/partner/promo/PromoCodeReportGrid'

let PartnerDataShow = ({ profile, showError, setToken }) => {
  return (
    <div className="layout layout--login">

      <div className="header">
        <div className="grid header__inner">
          <h1 className="grid__cell header__logo">
            Ясегодня
            <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
          </h1>
        </div>
      </div>
      <div>
       Ясегодня.Промокоды
      <br/>
      <br/>
      <PromoCodeReportGrid/>
    </div>
    </div>
  )
};

const mapStateToProps = state => ({ profile: state.profile })

const mapDispatchToProps = dispatch => ({
  showError: bindActionCreators(actions.createProfile, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
});

PartnerDataShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerDataShow);

export default PartnerDataShow
