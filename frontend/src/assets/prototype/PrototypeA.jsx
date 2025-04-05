import GlobalStyle from "./GlobalStyle";

export const PrototypeA = () => {
  return (
    <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5]`}>
      <div>
        {/* font type */}
        <h1>font type = poppins</h1>
        {/* topic font size */}
        <h1 className={GlobalStyle.headingLarge}>Topic</h1>
        {/* sub topic font size */}
        <h1 className={GlobalStyle.headingMedium}>Sub Topic</h1>
        {/* remark font size */}
        {/* text font size */}
        <h1 className={GlobalStyle.headingSmall}>Text</h1>
        {/* paragraph font size */}
        <p className={GlobalStyle.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper, nunc et bibendum facilisis, nunc nisl aliquet nunc, eget
          aliquam nunc nisl eget nunc.
        </p>
        {/* remark font size */}
        <p className={GlobalStyle.remarkTopic}>Remark Topic</p>
      </div>

      <br />
      {/* button 1*/}
      <div className="flex gap-4">
        <h1>Button 01</h1>
        <button className={GlobalStyle.buttonPrimary}>Submit</button>
      </div>

      <br />
      {/* button 2*/}
      <div className="flex gap-4">
        <h1>Button 01</h1>
        <button className={GlobalStyle.buttonSecondary}>Submit</button>
      </div>

      <br />

      {/* textbox 1 */}
      <div className="flex gap-4">
        <label className={GlobalStyle.remarkTopic}>Remark</label>
        <input
          type="text"
          placeholder="Text here"
          className={GlobalStyle.inputText}
        />
      </div>

      <br />

      {/* textbox 2 */}
      <div className="mb-6">
        <label className={GlobalStyle.remarkTopic}>Remark</label>
        <input
          type="text"
          placeholder="Text here"
          className={GlobalStyle.inputText}
        />
      </div>

      <br />
      {/* dropdown */}
      <div className="flex gap-4">
        <h1>Select Box</h1>
        <select className={GlobalStyle.selectBox}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>


      {/* remark box */}
      <div className="mb-6">
        <label className={GlobalStyle.remarkTopic}>Remark</label>
        <textarea
          value=""
          className={`${GlobalStyle.remark}`}
          rows="5"
        ></textarea>
      </div>


    {/* card box*/}
    <div className={`${GlobalStyle.cardContainer}`}>
        <p className="mb-2">
          <strong>Case ID:</strong>
        </p>
        <p className="mb-2">
          <strong>Customer Ref:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Account no:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Arrears Amount:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Last Payment Date:</strong>{" "}
        </p>
      </div>

      {/* Mini card box*/}
    <div className={`${GlobalStyle.miniCardContainer}`}>
    </div>
      
      {/* case count Bar */}
      <div className={`${GlobalStyle.caseCountBar}`}>
        <div className="flex">
          <span className={GlobalStyle.countBarTopic}>Case count</span>
        </div>
        <div className={GlobalStyle.countBarSubTopicContainer}>
          <div className={GlobalStyle.countBarMainBox}>
            <span>Total:</span>
            <p>1259</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>5,000 - 10,000</span>
            <p>100</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>10,000 - 25,000</span>
            <p>250</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>25,000 - 50,000</span>
            <p>800</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>50,000 - 100,000</span>
            <p>61</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>&gt; 100,000</span>
            <p>98</p>
          </div>
        </div>
      </div>


    </div>
  );
};
