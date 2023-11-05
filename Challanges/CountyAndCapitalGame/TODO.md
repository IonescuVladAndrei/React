In the game, the player needs to match a country to its capital by clicking on appropriate buttons

1. Your component should receive a data property in the following format (an object with the correct answer, where the keys are the names of the countries and the value of each key is the capital of the country)

CountryCapitalGame data={{Germany: "Berlin", Azerbaijan : "Baku"}}

2. A button should be displayed for each country and each capital. See the example above would return the following buttons:
   Germany, Berlin, Azerbajan and Baku

3. The buttons should be displayed in random order.

4. Clicking a button should set its background color to dark blue (#0d1821).

5. Clicking another button should:

-   remove both buttons if a correct country and capital pair has been selected;
-   set the background color of both buttons to red (#ac1c1c) if a wrong pair has been selected.

6. Assuming the previously selected pair was wrong, clicking another button should restore the default background color of the wrong pair and set the background color of the clicked button to blue (as in point 4).

7. When there are no buttons left, display a message: Congratulations.
