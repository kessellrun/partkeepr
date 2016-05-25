<?php

/* @Framework/Form/money_widget.html.php */
class __TwigTemplate_dd8e767ea3b0d5e35c8b5aca82a94c4d9a907de4e0b4bdeb01d7d5cfb057be2b extends Twig_Template
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
        $__internal_3ad8ba56bd95260a9df002a0f5a9acf78299a50b0d726c1a97bae83cb4da4b35 = $this->env->getExtension("native_profiler");
        $__internal_3ad8ba56bd95260a9df002a0f5a9acf78299a50b0d726c1a97bae83cb4da4b35->enter($__internal_3ad8ba56bd95260a9df002a0f5a9acf78299a50b0d726c1a97bae83cb4da4b35_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/money_widget.html.php"));

        // line 1
        echo "<?php echo str_replace('";
        echo twig_escape_filter($this->env, (isset($context["widget"]) ? $context["widget"] : null), "html", null, true);
        echo "', \$view['form']->block(\$form, 'form_widget_simple'), \$money_pattern) ?>
";
        
        $__internal_3ad8ba56bd95260a9df002a0f5a9acf78299a50b0d726c1a97bae83cb4da4b35->leave($__internal_3ad8ba56bd95260a9df002a0f5a9acf78299a50b0d726c1a97bae83cb4da4b35_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/money_widget.html.php";
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
/* <?php echo str_replace('{{ widget }}', $view['form']->block($form, 'form_widget_simple'), $money_pattern) ?>*/
/* */
