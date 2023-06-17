import Images from './ImageGenerator';


export function cardImg(type: any, isWhite: boolean) {

  if ( type == "american-express" ||  type == "amex") {
    if(isWhite) {
      return Images.AMERICAN_WHITE
    }
    return Images.AMERICAN
  }
  else if ( type == "diners-club" || type == "diners") {
    if(isWhite) {
      return Images.DINERS_WHITE
    }
    return Images.DINER
  }
  else if ( type == "discover") {
    return Images.DISCOVER
  }
  else if ( type == "elo") {
    return Images.ELO
  }
  else if ( type == "hiper") {
    return Images.HIPER
  }
  else if ( type == "hipercard") {
    if(isWhite) {
      return Images.HIPERCARD_WHITE
    }
    return Images.HIPERCARD
  }
  else if ( type == "jcb") {
    return Images.JCB
  }
  else if ( type == "maestro") {
    return Images.MAESTRO
  }
  else if ( type == "mastercard" || type == "mastercard_debit") {
    if(isWhite) {
      return Images.MASTER_WHIE
    }
    return Images.MASTER
  }
  else if ( type == "mir") {
    return Images.MIR
  }
  else if ( type == "unionpay") {
    if(isWhite) {
      return Images.UNION_WHITE
    }
    return Images.UNION
  }
  else if ( type == "visa" || type == "visa_debit") {
    if(isWhite) {
      return Images.VISA_WHITE
    }
    return Images.VISA
  }
  else {
    return Images.DUMMY_CARD
  }
}