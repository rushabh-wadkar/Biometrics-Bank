function Capture() {
    try {
        var quality = 60;
        var timeout = 10;
        var res = CaptureFinger(quality, timeout);
        if (res.httpStaus) {
            if (res.data.ErrorCode == "0") {
                return res.data;
            }
        }
        else {
            alert(res.err);
        }
    }
    catch (e) {
        alert(e);
    }
    return false;
}

function Match(isotemplate) {
    var quality = 60;
    var timeout = 10;
    try {
        var res = MatchFinger(quality, timeout, isotemplate);

        if (res.httpStaus) {
            if (res.data.Status) {
                return true;
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alert(res.data.ErrorDescription);
                }
                else {
                    return false;
                }
            }
        }
        else {
            alert(res.err);
        }
    }
    catch (e) {
        alert(e);
    }
    return false;
}

function Verify(iso1, iso2) {
    try {
        var res = VerifyFinger(iso1, iso2);

        if (res.httpStaus) {
            if (res.data.Status) {
              return true;
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alert(res.data.ErrorDescription);
                    return false;
                }
                else {
                  return false;
                }
            }
        }
        else {
            alert(res.err);
            return false;
        }
    }
    catch (e) {
        alert(e);
        return false;
    }
    return false;

}
