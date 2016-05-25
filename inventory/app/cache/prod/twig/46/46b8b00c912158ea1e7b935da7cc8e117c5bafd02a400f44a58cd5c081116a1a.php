<?php

/* TwigBundle:Exception:error.json.twig */
class __TwigTemplate_521bfc5c5c9b9e4a8cea734845538b5cf625bf1f70fc65ed895bd1f8e4373584 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_7345da7013b8c230e19cec63bbc67cff633061441dfbeb1e5c84fbf6e12d8ab6 = $this->env->getExtension("native_profiler");
        $__internal_7345da7013b8c230e19cec63bbc67cff633061441dfbeb1e5c84fbf6e12d8ab6->enter($__internal_7345da7013b8c230e19cec63bbc67cff633061441dfbeb1e5c84fbf6e12d8ab6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.json.twig"));

        // line 1
        echo twig_jsonencode_filter(array("error" => array("code" => (isset($context["status_code"]) ? $context["status_code"] : null), "message" => (isset($context["status_text"]) ? $context["status_text"] : null))));
        echo "
";
        
        $__internal_7345da7013b8c230e19cec63bbc67cff633061441dfbeb1e5c84fbf6e12d8ab6->leave($__internal_7345da7013b8c230e19cec63bbc67cff633061441dfbeb1e5c84fbf6e12d8ab6_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.json.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {{ { 'error': { 'code': status_code, 'message': status_text } }|json_encode|raw }}*/
/* */
