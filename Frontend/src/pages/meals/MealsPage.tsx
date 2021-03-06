import {FC, useCallback, useRef} from "react";
import useMeals from "../../hooks/useMeals";
import MealCreatingModal, {MealCreatingFormValues} from "./MealCreatingModal";
import MealCard from "./MealCard";
import ApiMeal from "../../backendApi/models/ApiMeal";
import MealApiService from "../../backendApi/services/MealApiService";
import {ProblemDetails} from "../../backendApi/models/ProblemDetails";

const MealsPage: FC = function () {
    const meals = useMeals({includeMealTags: true});
    const handleMealEditing = useCallback((meal:ApiMeal) => console.log("Edit.", meal), []);
    const handleMealDeleting = useCallback((meal:ApiMeal) => {
        MealApiService.delete({id: meal.id})
            .then(response => {
                if(response instanceof ProblemDetails)
                    console.error(response);
                else {
                    meals.reload();
                }
            });
    }, [meals]);

    const handleMealSave = useCallback((formValues: MealCreatingFormValues) => {
        MealApiService.create(formValues)
            .then(response => {
                if(response instanceof ProblemDetails)
                    console.error(response);
                else {
                    meals.reload();
                }
            });
    }, [meals]);
    const mealCreatingModalRef = useRef<MealCreatingModal>(null);

    return (
        <div className="container my-3">
            <div className="row my-3">
                <div className="col-auto p-0">
                    <button className="btn btn-primary"
                            onClick={() => mealCreatingModalRef.current?.show()}
                            type="button">
                        <i className="fa fa-plus" aria-hidden="true"></i> New
                    </button>
                </div>
            </div>
            <div className="g-3 row">
                {meals.values.map(x =>
                    <MealCard meal={x} key={x.id}
                              onEdit={handleMealEditing}
                              onDelete={handleMealDeleting} />
                )}
            </div>
            <MealCreatingModal ref={mealCreatingModalRef} onSave={handleMealSave} />
        </div>
    );
};

export default MealsPage;