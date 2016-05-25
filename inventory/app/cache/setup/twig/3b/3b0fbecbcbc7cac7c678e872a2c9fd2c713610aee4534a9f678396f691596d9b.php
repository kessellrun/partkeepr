<?php

/* PartKeeprSetupBundle::parameters.php.twig */
class __TwigTemplate_b3115607276bb9e7b5aba3bbef6df826f056fcdd841430d5da78d8c8856d79fc extends Twig_Template
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
        $__internal_cd6029de7aaa0a4c5968ffa0af161c6ccaa72b377445b130445ae40b7396b4f5 = $this->env->getExtension("native_profiler");
        $__internal_cd6029de7aaa0a4c5968ffa0af161c6ccaa72b377445b130445ae40b7396b4f5->enter($__internal_cd6029de7aaa0a4c5968ffa0af161c6ccaa72b377445b130445ae40b7396b4f5_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprSetupBundle::parameters.php.twig"));

        // line 1
        echo "<?php
";
        // line 2
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["parameters"]) ? $context["parameters"] : null));
        foreach ($context['_seq'] as $context["name"] => $context["value"]) {
            // line 3
            echo "\$container->setParameter('";
            echo twig_escape_filter($this->env, $context["name"], "html", null, true);
            echo "', ";
            echo $context["value"];
            echo ");
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['name'], $context['value'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        
        $__internal_cd6029de7aaa0a4c5968ffa0af161c6ccaa72b377445b130445ae40b7396b4f5->leave($__internal_cd6029de7aaa0a4c5968ffa0af161c6ccaa72b377445b130445ae40b7396b4f5_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprSetupBundle::parameters.php.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  29 => 3,  25 => 2,  22 => 1,);
    }
}
/* <?php*/
/* {% for name,value in parameters %}*/
/* $container->setParameter('{{ name }}', {{ value|raw }});*/
/* {% endfor %}*/
/* */
