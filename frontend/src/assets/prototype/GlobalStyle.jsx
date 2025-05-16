const GlobalStyle = {
  
    // General Font Settings
    fontPoppins: "font-[poppins]", 
  
    // Text Styles
    headingLarge: "text-[30px] font-bold",
    headingMedium: "text-[22px] font-semibold",
    headingSmall: "text-[18px] ",
    paragraph: "text-gray-700 text-justify text-[16px]",
    textBoxTopic: "block mb-2 text-[20px]",
    remarkTopic: "block mb-2 text-[20px]",
  
    // Button Styles
    buttonPrimary: "px-5 py-1.5 bg-[#8B5E3C] text-black border-2 border-[#543310] rounded-full hover:bg-[#543310] hover:text-white hover:border-[#8B5E3C] transition-all duration-300 shadow-sm",
    buttonSecondary: "bg-gradient-to-r from-[#543310] to-[#8b5e3c] text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition",

    // Input Styles
    inputText: "px-5 py-1 opacity-80 border-2 border-[#543310] rounded-lg text-gray-600 focus:bg-[#F7EDE5] focus:border-[#2F1B06]",
    remark: "px-5 py-1 opacity-80 border-2 border-[#543310] border-opacity-30 rounded-lg text-gray-600 w-2/4 focus:bg-[#F7EDE5] focus:border-[#2F1B06]",
  
    // Select/Dropdown Styles
    selectBox: "py-1 border-2 opacity-80 border-[#543310] rounded-lg text-left w-full focus:bg-[#F7EDE5] focus:border-[#2F1B06]",

  
    // Card Styles
    cardContainer: "p-4 rounded-lg shadow-xl mb-6 bg-[#CFB397] bg-opacity-15 w-6/12",

    //Mini card styles
    miniCardContainer: "p-6 rounded-lg shadow-2xl mb-6 bg-[#E2D0BD] bg-opacity-15 w-65 h-60 hover:shadow-3xl hover:scale-105 transform transition-all duration-300 ease-in-out",
  
    // case count bar
    caseCountBar: "flex flex-col space-y-4 p-4 bg-[#CFB397] border-2 border-[#74512D] rounded-3xl mb-4 shadow-lg bg-opacity-40",
    countBarSubTopicContainer: "flex flex-wrap gap-16 justify-center items-center",
    countBarMainBox: "shadow-md py-3 px-8 rounded-3xl flex flex-col items-center bg-[#E2D0BD] text-white w-full sm:w-auto",
    countBarSubBox: "shadow-md py-3 px-8 rounded-3xl flex flex-col items-center bg-[#E2D0BD] w-full sm:w-auto",
    
    // SearchBar
    searchBarContainer: "relative bg-blue-50 bg-opasity-60 rounded-full",
    searchBarIcon: "absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400",
  
    // Miscellaneous
    errorText: "text-red-500 mt-2 text-[16px] text-center",
  
    // you can center
    navButtonContainer: "flex justify-center space-x-4 mt-4",
  
  };
  
  export default GlobalStyle;
  