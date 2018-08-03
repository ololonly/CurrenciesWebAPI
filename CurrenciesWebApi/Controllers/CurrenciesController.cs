using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.UI.WebControls;
using System.Xml;
using CurrenciesWebApi.Models;
using System.Runtime.Serialization.Json;

namespace CurrenciesWebApi.Controllers
{
    public class CurrenciesController : ApiController
    {

        //CBR API url
        private const string _cbrApiUrl = @"http://www.cbr.ru/scripts/XML_daily.asp";

        // GET: api/Currencies
        public List<Currency> Get() => _getCurrencyList(_cbrApiUrl);

        // GET: api/Currencies/dt
        [Route("api/Currencies/{dt:DateTime}")]
        public List<Currency> Get(DateTime? dt) => _getCurrencyList(_cbrApiUrl + $"?date_req={dt}");

        private List<Currency> _getCurrencyList(string url)
        {
            List<Currency> result = new List<Currency>();
            XmlDocument currencies = new XmlDocument();
            //Download currencies from cbr.ru
            currencies.Load(url);
            foreach (XmlNode xmlNode in currencies.DocumentElement)
            {
                if (xmlNode.Attributes!=null && xmlNode.Attributes.Count > 0)
                {
                    //Getting new currency by ID
                    XmlNode attr = xmlNode.Attributes.GetNamedItem("ID");
                    if (attr != null)
                        result.Add(new Currency(xmlNode.Attributes.GetNamedItem("ID").Value));
                }
                //Adding currency parameters
                foreach (XmlNode childNode in xmlNode.ChildNodes)
                {
                    if (childNode.Name == "Name")
                    {
                        result.Last().Name = childNode.InnerText;
                    }
                    if (childNode.Name == "CharCode")
                    {
                        result.Last().CharCode = childNode.InnerText;
                    }
                    if (childNode.Name == "Nominal")
                    {
                        result.Last().Nominal = Convert.ToInt32(childNode.InnerText);
                    }
                    if (childNode.Name == "Value")
                    {
                        result.Last().Value = Convert.ToDecimal(childNode.InnerText);
                    }
                }
                //Counting currency price per one
                result.Last().PricePerOne = result.Last().Value / result.Last().Nominal;
            }
            return result;
        }
    }
}
