const home = (req, res) => {
  try {
    res.status(200).send("Server is running smoothly on 8000!");
    console.log("/ api hit");
  } catch (e) {
    print(e);
    res.status(500).send("Server failed");
  }
};

module.exports = {
  home,
};
