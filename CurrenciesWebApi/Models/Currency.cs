using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace CurrenciesWebApi.Models
{   
    //Currency class
    [DataContract]
    public class Currency
    {
        [DataMember]
        public string ID;
        [DataMember(Name = "Название")]
        public string Name;
        [DataMember(Name = "Буквенный код")]
        public string CharCode;
        [DataMember(Name = "Курс за")]
        public int Nominal;
        [DataMember(Name = "Курс")]
        public decimal Value;
        [DataMember(Name = "Цена за единицу")]
        public decimal PricePerOne;

        public Currency(string id)
        {
            this.ID = id;
        }
    }
}