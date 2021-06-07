import { Card, TextField } from "@material-ui/core";
import { useState } from "react";

const CreditCard = () => {
  const [creditCardNumber, setCreditCardNumber] = useState(
    ""
  );
  const [creditCardHolderName, setCreditCardHolderName] =
    useState("");

  const visaImageLink =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";

  const masterCardImageLink =
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg";
  const amexCardImageLink =
    "https://cdn.icon-icons.com/icons2/1178/PNG/512/amex_82052.png";

  const inValidImageLink =
    "https://previews.123rf.com/images/chrisdorney/chrisdorney1411/chrisdorney141100155/34073570-invalid-red-rubber-stamp-over-a-white-background-.jpg";

  const type = cardType(creditCardNumber);

  const cardImage = (creditCardNumber) => {
    if (type === "Invalid") {
      return inValidImageLink;
    } else if (type === "AMEX") {
      return amexCardImageLink;
    } else if (type === "Master Card") {
      return masterCardImageLink;
    } else if (type === "VISA") {
      return visaImageLink;
    }
  };
  const addSpaceAfterFour = (number) => {
    number = number.toString();
    return number.match(/.{1,4}/g).join(" ");
  };

  // Get the Credit card number

  function checksum(creditCardNumber) {
    //   console.log(creditCardNumber);

    // Iterate over the creditCardNumber
    creditCardNumber = reverseString(creditCardNumber.toString());
    let secondToLastSum = 0;
    for (var i = 0; i < creditCardNumber.length; i++) {
      if ((i + 1) % 2 === 0) {
        if ((parseInt(creditCardNumber[i]) * 2).toString().length === 2) {
          // console.log(parseInt(creditCardNumber[i]) * 2)
          secondToLastSum += sumOfString(parseInt(creditCardNumber[i]) * 2);
        } else {
          secondToLastSum += parseInt(creditCardNumber[i] * 2);
        }
      } else {
        secondToLastSum += parseInt(creditCardNumber[i]);
      }
    }
    //   console.log(secondToLastSum)
    return secondToLastSum % 2 === 0;
  }

  // console.log(checksum(4003600000000014));
  // console.log(secondToLastSum)

  function sumOfString(num) {
    num = num.toString();
    let sum = 0;
    for (var i = 0; i < num.length; i++) {
      sum += parseInt(num[i]);
    }
    return sum;
  }

  // console.log(sumOfString(1))
  // Reverse string
  function reverseString(str) {
    if (str === "") return "";
    else return reverseString(str.substr(1)) + str.charAt(0);
  }

  function cardType(creditCardNumber) {
    if (typeof parseInt(creditCardNumber) !== "number") {
      return "Invalid";
    }

    creditCardNumber = creditCardNumber.toString();
    //   console.log("Credit Card Length: " + creditCardNumber.length);

    if (checksum(creditCardNumber) === true) {
      // console.log("Check sum pass");

      // Check For AMEX
      var firstTwoChar = creditCardNumber.toString().substring(0, 2);
      // console.log("First Two Char: " + firstTwoChar);
      const masterCardTwoValid =
        firstTwoChar === "51" ||
        firstTwoChar === "52" ||
        firstTwoChar === "53" ||
        firstTwoChar === "54" ||
        firstTwoChar === "55";
      const amexTwoValid = firstTwoChar === "34" || firstTwoChar === "37";
      const visaTwoValid = creditCardNumber[0] === "4";
      const visaCardLenValid =
        creditCardNumber.length === 13 || creditCardNumber.length === 16;
      // console.log("Master Card Two Valid: " + masterCardTwoValid);
      // console.log("Amex Card Two Valid: " + amexTwoValid);
      // console.log("Visa Card Two Valid: " + visaTwoValid);
      // console.log("Visa Card Len Valid: " + visaCardLenValid);

      if (creditCardNumber.length === 15 && amexTwoValid) {
        //   console.log("AMEX");
        return "AMEX";
      } else if (creditCardNumber.length === 16 && masterCardTwoValid) {
        console.log("Master Card");
        return "Master Card";
      } else if (visaCardLenValid && visaTwoValid) {
        //   console.log("VISA");
        return "VISA";
      } else {
        //   console.log("Invalid");
        return "Invalid";
      }
    } else {
      // console.log("Invalid");
      return "Invalid";
    }
  }


  const handleCreditCardHolderNameChange = (event) => {
    setCreditCardHolderName(event.target.value);
  };

  const handleCreditCardNumberChange = (event) => {
    setCreditCardNumber(event.target.value);
  };
  return (
    <div>
      <Card variant="outlined" style={cardStyle}>
        <div className="firstRow" style={firstRowStyle}>
          <div className="chipImage" style={chipImageStyle}>
            <img
              style={{ width: 50 }}
              alt="chip"
              src={
                "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              }
            />
          </div>
          <div className="cardName" style={cardNameStyle}>
            <img
              src={cardImage(creditCardNumber)}
              alt="visaImageLink"
              style={{ width: 100, marginRight: 10 }}
            />
          </div>
        </div>
        <div className="secondRow" style={secondRowStyle}>
          <div style={{ fontSize: 30 }}>
            {creditCardNumber === ""
              ? "#### #### #### ####"
              : addSpaceAfterFour(creditCardNumber)}
          </div>
        </div>
        <div className="thirdRow" style={thirdRowStyle}>
          <div style={{ fontSize: 30 }}>
            {creditCardHolderName === ""
              ? "CS50 Credit Card"
              : creditCardHolderName}
          </div>
        </div>
      </Card>

      <Card style={cardFormStyle}>
        <div style={{ margin: "auto", marginTop: 20 }}>
          <form>
            <TextField
              id="filled-basic"
              label="Credit Card Number"
              variant="filled"
              value={creditCardNumber}
              onChange={handleCreditCardNumberChange}
            />
          </form>
        </div>
        <div style={{ margin: "auto", marginTop: 20, marginBottom: 30 }}>
          <form>
            <TextField
              id="filled-basic"
              label="Card Holder"
              variant="outlined"
              color="primary"
              value={creditCardHolderName}
              onChange={handleCreditCardHolderNameChange}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

const cardFormStyle = {
  width: 700,
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "201",
  // backgroundImage: "linear-gradient(0deg, bl, blue)",
  // backgroundColor: "#485461",
  // backgroundImage: "linear-gradient(25deg, #485461 0%, #28313b 74%)",
};

const thirdRowStyle = {
  marginTop: 20,
  marginLeft: 10,
};

const cardNameStyle = {
  marginLeft: "auto",
  height: "10px",
};

const chipImageStyle = {};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 450,
  margin: "auto",
  width: "50%",
  height: 300,
  marginBottom: 30,
  backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)",
};

const firstRowStyle = {
  display: "flex",
  marginTop: 20,
  marginLeft: 10,
};

const secondRowStyle = {
  display: "flex",
  margin: 10,
  marginTop: 60,
};

export default CreditCard;
