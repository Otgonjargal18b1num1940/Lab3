class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(date) {
        var parent = document.getElementById(this.id);
        parent.appendChild(this._createCalender(date));
    }

    _createCalender(date) {
        var table = document.createElement("table"); 
        var header = this._createCalenderHeader(table, date);
        var short_day = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
        var rowWeek = header.insertRow(1);
        rowWeek.setAttribute("id", "short_day");
        for (var i = 0; i < 7; ++ i) {
            var cell = rowWeek.insertCell(i);
            cell.innerHTML = short_day[i];
        }
        
       var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var currentDate = new Date(firstDay.getTime());
        currentDate.setDate(-firstDay.getDay() + 1);
        var Index = 2;
        while (true) {
            var row = table.insertRow(Index);
            Index = Index + 1;
            
            for (var i = 0; i < 7; ++ i) {
                    var cell = row.insertCell(i);
                cell.innerHTML = currentDate.getDate();

                if (currentDate.getMonth() === date.getMonth()) {
                    cell.setAttribute("id", "CurrentMonth");
                        let select = {
                            month: currentDate.getMonth() + 1,
                            day: cell.innerHTML,
                            year: currentDate.getFullYear()
                        }; 
                    cell.addEventListener("click", () => {
                    this.callback(this.id, select);
                    });
                } else {
                    cell.setAttribute("id", "OtherMonth");
                    cell.addEventListener("click",()=>{
                        console.log("ene sariin odor bish");
                    });
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

            
            if (currentDate.getMonth() != date.getMonth()) {
                break;
            }
        }
        return table;
    }

   
    _createCalenderHeader(table, date) {
        var header = table.createTHead();
        var headerRow = header.insertRow(0);
        var preview = headerRow.insertCell(0);
        preview.innerHTML = "prev";
        preview.setAttribute("id", "preview");

        var monthCell = headerRow.insertCell(1);
        var months = ["January", "February","March", "April","May", "June", "July", "August", "September",
        "October","November","December"];
        monthCell.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        monthCell.colSpan = "5";
        monthCell.setAttribute("id", "month");
        var next = headerRow.insertCell(2);
        next.innerHTML = "next";
        next.setAttribute("id", "next");

        preview.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            console.log(date);
            this.render(date);
          
        });

        next.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            console.log(date);
            this.render(date);
        });

        return header;
    }
};
