import pandas as pd
from bs4 import BeautifulSoup
import argparse

# Function to parse command-line arguments
def parse_args():
    parser = argparse.ArgumentParser(description="Replace HTML table rows with data from an Excel file.")
    parser.add_argument('excel_file', type=str, help='Path to the Excel file')
    parser.add_argument('output_file', type=str, help='Path to the output HTML file')
    return parser.parse_args()

# Generate HTML table cells (preserve existing <td> format)
def generate_html_cells(row_data, existing_tr):
    cells = []
    # Replace NaN values with empty strings or a default value
    row_data = row_data.fillna('')
    # Find all existing <td> elements in the <tr>
    existing_tds = existing_tr.find_all('td')
    for i, cell in enumerate(row_data):
        cell_value = str(cell) if pd.notna(cell) else ''  # Replace NaN with empty string
        # Preserve existing <td> format and replace its content
        if i < len(existing_tds):
            td = existing_tds[i]
            td.string = cell_value
            cells.append(td)
        else:
            # Create new <td> elements if there are more cells than existing <td>
            new_td = BeautifulSoup(f'<td>{cell_value}</td>', 'html.parser')
            cells.append(new_td)
    return cells

def main():
    # Parse command-line arguments
    args = parse_args()
    excel_file = args.excel_file
    output_file = args.output_file

    # Read the Excel file
    df = pd.read_excel(excel_file, sheet_name='Sheet1')  # Modify if sheet name is different

    # Select rows 10 to 50 from the Excel file (Note: Python uses 0-based indexing, so subtract 1)
    excel_rows_to_replace = df.iloc[9:10]

    # Read the existing HTML file
    html_file = 'template.html'  # Modify this if the template file name is different
    with open(html_file, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # Find the HTML table
    table = soup.find('table')

    if table:
        # Find the <tbody> section of the table (assuming data rows are in <tbody>)
        tbody = table.find('tbody')
        if tbody:
            # Get all existing <tr> rows
            rows = tbody.find_all('tr')
            
            # Ensure there are enough rows for replacement
            if len(rows) >= len(excel_rows_to_replace) + 1:  # +1 because row numbers start from 11
                # Replace each row
                for idx, (row, tr) in enumerate(zip(excel_rows_to_replace.iterrows(), rows[10:11])):
                    _, data_row = row
                    # Generate new <td> content and preserve the original <tr> format
                    print(row)
                    new_cells = generate_html_cells(data_row, tr)
                    print(new_cells)
                    # Clear the existing <tr> content
                    tr.clear()
                    # Append new <td> content to the <tr>
                    for cell in new_cells:
                        tr.append(cell)
            else:
                print("The number of rows in the HTML table is insufficient for replacement")
        else:
            print("No <tbody> element found")
    else:
        print("No HTML table found")

    # Save the modified HTML file with formatted output
    with open(output_file, 'w', encoding='utf-8') as file:
        # Write each <td> element on a new line
        formatted_html = str(soup).replace('</td><td>', '</td>\n<td>').replace('</tr><tr>', '</tr>\n<tr>')
        file.write(formatted_html)

    print("HTML file has been updated")

if __name__ == "__main__":
    main()

