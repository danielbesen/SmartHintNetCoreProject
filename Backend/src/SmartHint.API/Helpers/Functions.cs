using System.Globalization;

namespace SmartHint.API.Helpers
{
    public class Functions
    {
        public static DateTime? formatDate(string date)
        {
            DateTime? formatedDate = null;

            if (date != null && date != "null")
            {
                string format = "dd/MM/yyyy";
                if (DateTime.TryParseExact(date, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDateTime))
                {
                    formatedDate = parsedDateTime;
                }
                return formatedDate;
            }
            return formatedDate;
        }
    }
}