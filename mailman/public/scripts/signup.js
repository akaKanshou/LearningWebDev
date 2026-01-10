$("#submitResult").hide();

function submitPostSignup(event) {
    event.preventDefault();

    console.log("Called func\n");

    try {
        const formVals = $("input");

        const requestBody = {
            'fname': formVals[0].value,
            'lname': formVals[1].value,
            'email': formVals[2].value
        };

        const signUpResult = new Request("/signup", { method: "POST", body: JSON.stringify(requestBody) });

        fetch(signUpResult)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);

                return response.text();
            })
            .then((responseString) => {
                if (responseString === "SUCCESS") {
                    $("#submitResult").css("color", "rgb(12, 183, 12)");
                    $("#submitResult").text("Successfully Subscribed!");
                }
                else if (responseString === "ERROR_CONTACT_EXISTS") {
                    $("#submitResult").css("color", "yellow");
                    $("#submitResult").text("This email is already subscribed!");
                    console.log("asd");
                }
                else if (responseString === "ERROR_GENERIC") {
                    $("#submitResult").css("color", "red");
                    $("#submitResult").text("Please enter a real email address! If you think this is a mistake, please contact us.");
                }
                else {
                    $("#submitResult").css("color", "purple");
                    $("#submitResult").text("Some error occurred.");
                }

                $("#submitResult").show();
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (error) {
        console.error(error);
    }

    return false;
}
