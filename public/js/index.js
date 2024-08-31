$(document).ready(function() {
    $("#datepicker").datepicker({
        dateFormat: 'dd-mm-yy',
        setDate: new Date()
    }).datepicker("setDate", new Date());
});

$(document).ready(function() {
    $("#datepicker2").datepicker({
        dateFormat: 'dd-mm-yy',
        setDate: new Date()
    }).datepicker("setDate", new Date());
});

function getFinancialYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    let financialYearStart, financialYearEnd;

    if (currentMonth >= 4) { 
        financialYearStart = currentYear;
        financialYearEnd = currentYear + 1;
    } else { // From January to March
        financialYearStart = currentYear - 1;
        financialYearEnd = currentYear;
    }

    return `${financialYearStart}-${financialYearEnd.toString().slice(-2)}`;
}


$('#inovice_no').val(`SBD/${getFinancialYear()}/150`)

$(document).ready(function(){
    $.ajax({
        url:'/onload_party_name',
        method:'POST',
        success: function(res) {
            console.log(res);
            const selectPicker = $('#selectPicker');
            selectPicker.empty();

            res.companies.forEach(company => {
                selectPicker.append(`
                <option value="${company.party_name}">
                
                `);
            });

            selectPicker.selectpicker('refresh');
        },
    })
})

$(document).ready(function() {

$(document).on('keyup','#input_party_name',function(){
    var party_name = $(this).val();
    $('#address').val('')
    $('#gst_no').val('')
     $.ajax({
        url:'/get_address_gst_by_party',
        method:'POST',
        data:{
            party_name:party_name
        },
        success: function(res) {
            console.log(res);

            $('#address').val(res.address);
            $('#gst_no').val(res.gst_no);
          
            
        }
    })
})

})


$(document).ready(function() {

    $(document).on('keyup', '#quantity', function() {
        let quantity = parseFloat($('#quantity').val()) || 0;
        let rate = parseFloat($('#rate').val()) || 0;
        let total = quantity * rate;
        
  


        $('#amount').val(total.toFixed(2));
    });

    $(document).on('keyup', '#rate', function() {
        let quantity = parseFloat($('#quantity').val()) || 0;
        let rate = parseFloat($('#rate').val()) || 0;
        let total = quantity * rate;
        
        let gstRate;

        if (rate < 1000) {
            gstRate = 5;
        } else {
            gstRate = 12;
        }

        $('#gst_rate').val(gstRate + '%');


        $('#amount').val(total.toFixed(2));
    });
});




$(document).ready(function() {
    let serialNumber = 1;

    $(document).on('click', '#add', function() {
        $('#table-div').removeClass('d-none');

        var party_name = $('#input_party_name').val();
        var address = $('#address').val();
        var product_description = $('#product_description').val();
        var gst_no = $('#gst_no').val();
        var quantity = $('#quantity').val();
        var hsn_no = $('#hsn_no').val();
        var rate = $('#rate').val();
        var gst_rate = $('#gst_rate').val();
        var amount = $('#amount').val();

        $('#tbody').append(`
            <tr class="text-center text-nowrap align-middle f_13 bg_b fw_600">
                <td>${serialNumber}</td>
                <td>${product_description}</td>
                <td>${hsn_no}</td>
                <td>${quantity}</td>
                <td>${rate}</td>
                <td>${gst_rate}</td>
                <td>${amount}</td>
                <td><button class="btn btn-danger btn-sm delete-row"><i class="fas fa-trash"></i></button></td>
            </tr>
        `);

        serialNumber++;

        $('#product_description').val('');
        $('#quantity').val('');
        $('#hsn_no').val('');
        $('#rate').val('');
        $('#gst_rate').val('');
        $('#amount').val('');
    });

    $(document).on('click', '.delete-row', function() {
        $(this).closest('tr').remove();
        serialNumber--; 
        $('#tbody tr').each(function(index) {
            $(this).find('td:first').text(index + 1);
        });
    });
});




// $(document).on('click', '#generate', function() {
//     let inovice_no = $('#inovice_no').val();
//     let date = $('#datepicker').val();
//     $('#inv_no').text(inovice_no);
//     $('#pdf_dt').text(date);

//     let buyer_date = $('#datepicker2').val();
//     $('#buyer_date').text(buyer_date);

//     let buyers_or = $('#buyers_order_no').val();
//     $('#buyers_or_no').text(buyers_or);

//     let party_name = $('#input_party_name').val();
//     let partyn = party_name.match(/^(.*?)\s*\((.*)\)$/);

//     if (partyn) {
//         $('#party_nme').text(partyn[1]);
//         $('#party_break').text('(' + partyn[2] + ')');
//     }

//     let address = $('#address').val();
//     let words = address.split(' ');
//     let formattedAddress = '';

//     for (let i = 0; i < words.length; i++) {
//         formattedAddress += words[i] + ' ';
//         if ((i + 1) % 4 === 0 && i !== words.length - 1) {
//             formattedAddress += '<br>';
//         }
//     }

//     let gst_no = $('#gst_no').val();
//     $('#gstin').text(gst_no);

//     $('#pdf_add').html(formattedAddress.trim());

//     $('#tbody_data').empty();

//     // Append rows from #tbody to #tbody_data
//     let totalAmount = 0;
//     let gst12Amount = 0;
//     let gst5Amount = 0;
//     let gst18Amount = 0;

//     $('#tbody tr').each(function(index) {
//         let cells = $(this).find('td');
//         let product_description = cells.eq(1).text();
//         let hsn_no = cells.eq(2).text();
//         let quantity = cells.eq(3).text();
//         let rate = cells.eq(4).text();
//         let gst_rate = cells.eq(5).text();
//         let amount = parseFloat(cells.eq(6).text());

//         totalAmount += amount;

//         if (gst_rate === '12%') {
//             gst12Amount += amount;
//         } else if (gst_rate === '5%') {
//             gst5Amount += amount;
//         } else if (gst_rate === '18%') {
//             gst18Amount += amount;
//         }

//         $('#tbody_data').append(`
//             <tr class="f_10 fw_600 text-center">
//                 <td>${index + 1}</td>
//                 <td>${product_description}</td>
//                 <td>${hsn_no}</td>
//                 <td>${quantity}</td>
//                 <td>${amount}</td>
//                 <td>${gst_rate}</td>
//                 <td class="fw-bold">${amount}</td>
//             </tr>
//         `);
//     });

//     $('#sub_total').text(totalAmount.toFixed(2));

//     // Calculate GST amounts
//     let gst12 = gst12Amount * 0.12;
//     let gst5 = gst5Amount * 0.05;
//     let gst18 = gst18Amount * 0.18;

//     $('#i_gst_twelve').text(gst12.toFixed(2));
//     $('#i_gst_five').text(gst5.toFixed(2));
//     $('#i_gst_eighteen').text(gst18.toFixed(2));

//     let my_gst = $('#my_gst').text();

//     if (gst_no && my_gst) {
//         let my_gst_prefix = my_gst.substring(0, 2);
//         let gst_no_prefix = gst_no.substring(0, 2);

//         if (my_gst_prefix === gst_no_prefix) {
//             // Apply c_gst and s_gst
//             $('.i_gst_row').addClass('d-none');
//             $('.c_gst_row').removeClass('d-none');

//             // Set GST values for CGST and SGST
//             let cgst12 = gst12 / 2;
//             let sgst12 = gst12 / 2;
//             let cgst5 = gst5 / 2;
//             let sgst5 = gst5 / 2;
//             let cgst18 = gst18 / 2;
//             let sgst18 = gst18 / 2;

//             $('#cgst12').text(cgst12.toFixed(2));
//             if (cgst12 > 0) {
//                 $('.cgst12_row').removeClass('d-none');
//             }

//             $('#sgst12').text(sgst12.toFixed(2));
//             if (sgst12 > 0) {
//                 $('.sgst12_row').removeClass('d-none');
//             }

//             $('#cgst5').text(cgst5.toFixed(2));
//             if (cgst5 > 0) {
//                 $('.cgst5_row').removeClass('d-none');
//             }

//             $('#sgst5').text(sgst5.toFixed(2));
//             if (sgst5 > 0) {
//                 $('.sgst5_row').removeClass('d-none');
//             }

//             $('#cgst18').text(cgst18.toFixed(2));
//             if (cgst18 > 0) {
//                 $('.cgst18_row').removeClass('d-none');
//             }

//             $('#sgst18').text(sgst18.toFixed(2));
//             if (sgst18 > 0) {
//                 $('.sgst18_row').removeClass('d-none');
//             }


//             let visibleRows = $('.freight_row').not('.d-none').length;
//             $('#freight_row').attr('rowspan', visibleRows);

//         } else {
//             // Apply i_gst
//             $('.c_gst_row').addClass('d-none');
//             $('.i_gst_row').removeClass('d-none');

//             // Set IGST values
//             $('#i_gst_twelve').text(gst12.toFixed(2));
//             $('#i_gst_five').text(gst5.toFixed(2));
//             $('#i_gst_eighteen').text(gst18.toFixed(2));
//         }
//     }



//     $('#total').text()

//     window.print();
// });

function numberToWords(num) {
    const a = [
        '', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE',
        'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'
    ];
    const b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    const g = ['', 'THOUSAND', 'LAKH', 'CRORE'];

    const convertHundreds = (num) => {
        let str = '';
        if (num > 99) {
            str += a[Math.floor(num / 100)] + ' HUNDRED ';
            num %= 100;
        }
        if (num > 19) {
            str += b[Math.floor(num / 10)] + ' ';
            num %= 10;
        }
        if (num > 0) {
            str += a[num] + ' ';
        }
        return str.trim();
    };

    if (num === 0) return 'ZERO RUPEES ONLY';

    let str = '';
    let pos = 0;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk > 0) {
            str = convertHundreds(chunk) + ' ' + g[pos] + ' ' + str;
        }
        num = Math.floor(num / 1000);
        pos++;
    }

    return str.trim() + ' RUPEES ONLY';
}


$(document).on('click', '#generate', function() {
    let inovice_no = $('#inovice_no').val();
    let date = $('#datepicker').val();
    $('#inv_no').text(inovice_no);
    $('#pdf_dt').text(date);

    let buyer_date = $('#datepicker2').val();
    $('#buyer_date').text(buyer_date);

    let buyers_or = $('#buyers_order_no').val();
    $('#buyers_or_no').text(buyers_or);

    let party_name = $('#input_party_name').val();
    let partyn = party_name.match(/^(.*?)\s*\((.*)\)$/);

    if (partyn) {
        $('#party_nme').text(partyn[1]);
        $('#party_break').text('(' + partyn[2] + ')');
    }

    let address = $('#address').val();
    let words = address.split(' ');
    let formattedAddress = '';

    for (let i = 0; i < words.length; i++) {
        formattedAddress += words[i] + ' ';
        if ((i + 1) % 4 === 0 && i !== words.length - 1) {
            formattedAddress += '<br>';
        }
    }

    let gst_no = $('#gst_no').val();
    $('#gstin').text(gst_no);

    $('#pdf_add').html(formattedAddress.trim());

    $('#tbody_data').empty();

    // Append rows from #tbody to #tbody_data
    let totalAmount = 0;
    let gst12Amount = 0;
    let gst5Amount = 0;
    let gst18Amount = 0;

    $('#tbody tr').each(function(index) {
        let cells = $(this).find('td');
        let product_description = cells.eq(1).text();
        let hsn_no = cells.eq(2).text();
        let quantity = cells.eq(3).text();
        let rate = cells.eq(4).text();
        let gst_rate = cells.eq(5).text();
        let amount = parseFloat(cells.eq(6).text());

        totalAmount += amount;

        if (gst_rate === '12%') {
            gst12Amount += amount;
        } else if (gst_rate === '5%') {
            gst5Amount += amount;
        } else if (gst_rate === '18%') {
            gst18Amount += amount;
        }

        $('#tbody_data').append(`
            <tr class="f_10 fw_600 text-center">
                <td>${index + 1}</td>
                <td>${product_description}</td>
                <td>${hsn_no}</td>
                <td>${quantity}</td>
                <td>${rate}</td>
                <td>${gst_rate}</td>
                <td class="fw-bold">${amount}</td>
            </tr>
        `);
    });

    $('#sub_total').text(totalAmount.toFixed(2));

    // Calculate GST amounts
    let gst12 = gst12Amount * 12/100;
    let gst5 = gst5Amount * 5/100;
    let gst18 = gst18Amount * 18/100;

    $('#i_gst_twelve').text(gst12.toFixed(2));
    $('#i_gst_five').text(gst5.toFixed(2));
    $('#i_gst_eighteen').text(gst18.toFixed(2));

    let my_gst = $('#my_gst').text();

    if (gst_no && my_gst) {
        let my_gst_prefix = my_gst.substring(0, 2);
        let gst_no_prefix = gst_no.substring(0, 2);

        if (my_gst_prefix === gst_no_prefix) {
            // Apply c_gst and s_gst
            $('.i_gst_row').addClass('d-none');
            $('.c_gst_row').removeClass('d-none');

            // Set GST values for CGST and SGST
            let cgst12 = gst12 / 2;
            let sgst12 = gst12 / 2;
            let cgst5 = gst5 / 2;
            let sgst5 = gst5 / 2;
            let cgst18 = gst18 / 2;
            let sgst18 = gst18 / 2;

            $('#cgst12').text(cgst12.toFixed(2));
            if (cgst12 > 0) {
                $('.cgst12_row').removeClass('d-none');
            }

            $('#sgst12').text(sgst12.toFixed(2));
            if (sgst12 > 0) {
                $('.sgst12_row').removeClass('d-none');
            }

            $('#cgst5').text(cgst5.toFixed(2));
            if (cgst5 > 0) {
                $('.cgst5_row').removeClass('d-none');
            }

            $('#sgst5').text(sgst5.toFixed(2));
            if (sgst5 > 0) {
                $('.sgst5_row').removeClass('d-none');
            }

            $('#cgst18').text(cgst18.toFixed(2));
            if (cgst18 > 0) {
                $('.cgst18_row').removeClass('d-none');
            }

            $('#sgst18').text(sgst18.toFixed(2));
            if (sgst18 > 0) {
                $('.sgst18_row').removeClass('d-none');
            }

            let visibleRows = $('.freight_row').not('.d-none').length;
            $('#freight_row').attr('rowspan', visibleRows);

        } else {
            // Apply i_gst
            $('.c_gst_row').addClass('d-none');
            $('.i_gst_row').removeClass('d-none');

            // Set IGST values
            $('#i_gst_twelve').text(gst12.toFixed(2));
            $('#i_gst_five').text(gst5.toFixed(2));
            $('#i_gst_eighteen').text(gst18.toFixed(2));
        }
    }

    // Calculate the total amount
    let totalGST = gst12 + gst5 + gst18;
    let total = totalAmount + totalGST;
    $('#total').text(total.toFixed(2));


    let totalInWords = numberToWords(total.toFixed(2));
    $('#total_in_words').text(totalInWords)

    window.print();
});




