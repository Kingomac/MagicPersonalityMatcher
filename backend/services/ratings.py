from sklearn.ensemble import HistGradientBoostingClassifier
from modAL.models import ActiveLearner


def save_rating(personality: str, text: str):
    print(f"Saving rating for {personality} and {text}")
    with open("ratings.csv", "a") as f:
        f.write(f"{personality},{text}\n")


def active_learning(estimator):
    # x_imp, y_imp  # datos de mejora del modelo
    learner = ActiveLearner(
        estimator=estimator,
    )

