CART_REDESIGN=("/DAB-Test-Code/cartPageTest/*" "head" "https://*.epicpass.com/cart*")
DAY_PASS_BUILDER=("/DAB-Test-Code/byoedp/*" "head" "https://*.epicpass.com/epic-day-pass*")
DAB_TESTS=("CART_REDESIGN[@]" "DAY_PASS_BUILDER[@]")
arr=('DAB_TESTS[@]')
COUNTER=0
TEST_IDX=0
TEST_DIR=""
TARGET=""
URL=""

echo "Installing JQ..."

brew list jq || brew install jq

test -f manifest.json && echo "Manifest file exists." || { touch manifest.json; echo "Creating manifest.json"; }

echo "Modifying Manifest file..."

for obj in "${arr[@]}"; do
    for test in "${!obj}"; do
        for elem in "${!test}"; do
          if [[ $COUNTER -eq 0 ]]; then
            TEST_DIR="$elem"
          elif [[ $COUNTER -eq 1 ]]; then
            TARGET="$elem"
          elif [[ $COUNTER -eq 2 ]]; then
            URL="$elem"
          fi
          COUNTER=$((COUNTER+1))
        done
        tmp=$(mktemp)
        jq --arg url "$URL" --arg dir "$TEST_DIR" \
          '.["content_scripts"] += [{"matches": [$url], "js": ["contentInjector.js"], "run_at": "document_end"}] | .["web_accessible_resources"] += [{"resources": [$dir], "matches": ["<all_urls>"]}]' \
          manifest.json > "$tmp" && mv "$tmp" manifest.json
        TEST_IDX=$((TEST_IDX+1))
        COUNTER=0
    done

done

echo "Manifest.json Updated!"

echo "Updating Content Injector..."

if grep -Fxq "injectFile( chrome.runtime.getURL('DAB-Test-Code/cartPageTest/cartChanges.js'), 'head');" contentInjector.js
then
  echo "Present"
else
  echo "Not present"
fi
